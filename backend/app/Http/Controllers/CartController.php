<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Helper untuk mengambil atau membuat keranjang belanja user
     */
    private function getUserCart(Request $request): Cart
    {
        return Cart::firstOrCreate(['user_id' => $request->user()->id]);
    }

    /**
     * Tampilkan isi keranjang belanja user yang login
     */
    public function index(Request $request)
    {
        $cart = $this->getUserCart($request);

        $cart->load(['items.book.category']);

        $totalPrice = 0;
        $totalItems = 0;

        foreach ($cart->items as $item) {
            $itemSubtotal = $item->quantity * $item->book->price;
            $item->subtotal = $itemSubtotal;
            $totalPrice += $itemSubtotal;
            $totalItems += $item->quantity;
        }

        return response()->json([
            'success' => true,
            'data' => [
                'cart_id' => $cart->id,
                'items' => $cart->items,
                'total_items' => $totalItems,
                'total_price' => $totalPrice,
            ],
        ]);
    }

    /**
     * Tambahkan buku ke dalam keranjang
     */
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'quantity' => 'nullable|integer|min:1',
        ], [
            'book_id.required' => 'Buku wajib dipilih.',
            'book_id.exists' => 'Buku tidak valid.',
            'quantity.min' => 'Jumlah buku minimal 1.',
        ]);

        $quantity = $validated['quantity'] ?? 1;
        $book = Book::findOrFail($validated['book_id']);

        if ($book->stock < $quantity) {
            return response()->json([
                'success' => false,
                'message' => "Stok buku tidak mencukupi (tersisa {$book->stock}).",
            ], 422);
        }

        $cart = $this->getUserCart($request);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('book_id', $book->id)
            ->first();

        if ($item) {
            $newQuantity = $item->quantity + $quantity;
            if ($book->stock < $newQuantity) {
                return response()->json([
                    'success' => false,
                    'message' => "Jumlah di keranjang melebihi stok yang tersedia (tersisa {$book->stock}).",
                ], 422);
            }
            $item->update(['quantity' => $newQuantity]);
        } else {
            $item = CartItem::create([
                'cart_id' => $cart->id,
                'book_id' => $book->id,
                'quantity' => $quantity,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil ditambahkan ke keranjang!',
            'data' => $item->load('book'),
        ], 201);
    }

    /**
     * Ubah jumlah item dalam keranjang
     */
    public function updateItem(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ], [
            'quantity.required' => 'Jumlah buku wajib diisi.',
            'quantity.min' => 'Jumlah buku minimal 1.',
        ]);

        $cart = $this->getUserCart($request);

        $item = CartItem::where('cart_id', $cart->id)->where('id', $id)->first();

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item keranjang tidak ditemukan.',
            ], 404);
        }

        $book = $item->book;
        if ($book->stock < $validated['quantity']) {
            return response()->json([
                'success' => false,
                'message' => "Stok buku tidak mencukupi (tersisa {$book->stock}).",
            ], 422);
        }

        $item->update(['quantity' => $validated['quantity']]);

        return response()->json([
            'success' => true,
            'message' => 'Jumlah buku berhasil diperbarui!',
            'data' => $item,
        ]);
    }

    /**
     * Hapus item dari keranjang belanja
     */
    public function removeItem(Request $request, $id)
    {
        $cart = $this->getUserCart($request);

        $item = CartItem::where('cart_id', $cart->id)->where('id', $id)->first();

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Item keranjang tidak ditemukan.',
            ], 404);
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item berhasil dihapus dari keranjang.',
        ]);
    }
}
