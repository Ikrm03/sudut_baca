<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Checkout dan Pembuatan Order Baru (Menggunakan Database Transaction)
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'phone' => 'required|string|max:30',
            'shipping_address' => 'required|string',
        ], [
            'recipient_name.required' => 'Nama penerima wajib diisi.',
            'phone.required' => 'Nomor telepon penerima wajib diisi.',
            'shipping_address.required' => 'Alamat pengiriman wajib diisi.',
        ]);

        $user = $request->user();
        $cart = Cart::where('user_id', $user->id)->with('items.book')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Keranjang belanja Anda masih kosong. Silakan pilih buku terlebih dahulu.',
            ], 422);
        }

        // Jalankan Database Transaction untuk menjamin integritas data (ACID)
        DB::beginTransaction();

        try {
            $totalPrice = 0;
            $itemsToCreate = [];

            // 1. Verifikasi stok setiap buku dan hitung harga berdasarkan database
            foreach ($cart->items as $cartItem) {
                // Kunci baris buku untuk update stok aman (pessimistic locking)
                $book = Book::lockForUpdate()->find($cartItem->book_id);

                if (!$book) {
                    throw new \Exception("Buku ID #{$cartItem->book_id} sudah tidak tersedia.");
                }

                if ($book->stock < $cartItem->quantity) {
                    throw new \Exception("Stok buku '{$book->title}' tidak mencukupi (tersisa {$book->stock}).");
                }

                $subtotal = $book->price * $cartItem->quantity;
                $totalPrice += $subtotal;

                $itemsToCreate[] = [
                    'book' => $book,
                    'quantity' => $cartItem->quantity,
                    'price' => $book->price,
                    'subtotal' => $subtotal,
                ];
            }

            // 2. Buat Nomor Pesanan Unik (Format: ORD-YYYYMMDD-XXXXXX)
            $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(Str::random(6));

            // 3. Simpan data induk pesanan
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => $orderNumber,
                'recipient_name' => $validated['recipient_name'],
                'phone' => $validated['phone'],
                'shipping_address' => $validated['shipping_address'],
                'total_price' => $totalPrice,
                'payment_method' => 'Payment at Delivery',
                'payment_status' => 'unpaid',
                'order_status' => 'pending',
            ]);

            // 4. Simpan rincian order_items dan kurangi stok buku
            foreach ($itemsToCreate as $itemData) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $itemData['book']->id,
                    'quantity' => $itemData['quantity'],
                    'price' => $itemData['price'],
                    'subtotal' => $itemData['subtotal'],
                ]);

                // Kurangi stok buku
                $itemData['book']->decrement('stock', $itemData['quantity']);
            }

            // 5. Kosongkan keranjang belanja user
            $cart->items()->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pesanan berhasil dibuat! Pembayaran dilakukan saat buku diterima (Payment at Delivery).',
                'data' => $order->load(['items.book']),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses checkout: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Riwayat pesanan milik user yang sedang login
     */
    public function userOrders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with(['items.book.category'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Tampilkan detail satu pesanan (User melihat miliknya, Admin melihat semuanya)
     */
    public function show(Request $request, $id)
    {
        $query = Order::with(['user', 'items.book.category']);

        // Jika bukan admin, hanya bisa melihat pesanannya sendiri
        if ($request->user()->role !== 'admin') {
            $query->where('user_id', $request->user()->id);
        }

        $order = $query->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Data pesanan tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    /**
     * Tampilkan seluruh pesanan untuk Admin
     */
    public function adminOrders(Request $request)
    {
        $query = Order::with(['user', 'items.book']);

        if ($request->filled('status')) {
            $query->where('order_status', $request->status);
        }

        $orders = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Perbarui status pesanan & pembayaran (Admin)
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'order_status' => 'required|in:pending,processing,shipped,completed,cancelled',
            'payment_status' => 'nullable|in:unpaid,paid',
        ], [
            'order_status.required' => 'Status pesanan wajib dipilih.',
            'order_status.in' => 'Status pesanan tidak valid.',
        ]);

        $order = Order::with('items.book')->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Data pesanan tidak ditemukan.',
            ], 404);
        }

        DB::beginTransaction();

        try {
            $oldStatus = $order->order_status;
            $newStatus = $validated['order_status'];

            // Jika pesanan dibatalkan dan status sebelumnya bukan cancelled, kembalikan stok buku
            if ($newStatus === 'cancelled' && $oldStatus !== 'cancelled') {
                foreach ($order->items as $item) {
                    if ($item->book) {
                        $item->book->increment('stock', $item->quantity);
                    }
                }
            }

            // Jika pesanan diselesaikan (Completed) pada sistem Payment at Delivery,
            // maka otomatis status pembayaran menjadi Paid
            if ($newStatus === 'completed' && empty($validated['payment_status'])) {
                $order->payment_status = 'paid';
            } elseif (!empty($validated['payment_status'])) {
                $order->payment_status = $validated['payment_status'];
            }

            $order->order_status = $newStatus;
            $order->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Status pesanan berhasil diperbarui!',
                'data' => $order->fresh(['user', 'items.book']),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah status pesanan: ' . $e->getMessage(),
            ], 500);
        }
    }
}
