<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * Tampilkan daftar buku dengan pencarian & filter kategori
     */
    public function index(Request $request)
    {
        $query = Book::with('category');

        // Fitur 5: Pencarian Buku berdasarkan judul atau penulis
        if ($request->filled('search')) {
            $keyword = $request->search;
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', "%{$keyword}%")
                  ->orWhere('author', 'like', "%{$keyword}%");
            });
        }

        // Filter berdasarkan kategori
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Urutan
        $sort = $request->get('sort', 'newest');
        if ($sort === 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        $books = $query->get();

        return response()->json([
            'success' => true,
            'data' => $books,
            'total' => $books->count(),
        ]);
    }

    /**
     * Fitur 4: Tampilkan detail lengkap 1 buku
     */
    public function show($id)
    {
        $book = Book::with('category')->find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Buku tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $book,
        ]);
    }

    /**
     * Fitur Admin: Tambah buku baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [
            'category_id.required' => 'Kategori buku wajib dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'title.required' => 'Judul buku wajib diisi.',
            'author.required' => 'Penulis buku wajib diisi.',
            'description.required' => 'Deskripsi buku wajib diisi.',
            'price.required' => 'Harga buku wajib diisi.',
            'stock.required' => 'Stok buku wajib diisi.',
            'cover.image' => 'File cover harus berupa gambar.',
            'cover.max' => 'Ukuran gambar maksimal 2MB.',
        ]);

        if ($request->hasFile('cover')) {
            $path = $request->file('cover')->store('books', 'public');
            $validated['cover'] = $path;
        }

        $book = Book::create($validated);
        $book->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil ditambahkan!',
            'data' => $book,
        ], 201);
    }

    /**
     * Fitur Admin: Update buku
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Buku tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ], [
            'category_id.required' => 'Kategori buku wajib dipilih.',
            'category_id.exists' => 'Kategori yang dipilih tidak valid.',
            'title.required' => 'Judul buku wajib diisi.',
            'author.required' => 'Penulis buku wajib diisi.',
            'description.required' => 'Deskripsi buku wajib diisi.',
            'price.required' => 'Harga buku wajib diisi.',
            'stock.required' => 'Stok buku wajib diisi.',
        ]);

        if ($request->hasFile('cover')) {
            // Hapus cover lama jika ada di local storage
            if ($book->cover && !filter_var($book->cover, FILTER_VALIDATE_URL) && Storage::disk('public')->exists($book->cover)) {
                Storage::disk('public')->delete($book->cover);
            }
            $path = $request->file('cover')->store('books', 'public');
            $validated['cover'] = $path;
        }

        $book->update($validated);
        $book->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Data buku berhasil diperbarui!',
            'data' => $book,
        ]);
    }

    /**
     * Fitur Admin: Hapus buku
     */
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Buku tidak ditemukan.',
            ], 404);
        }

        // Hapus cover jika ada di disk public
        if ($book->cover && !filter_var($book->cover, FILTER_VALIDATE_URL) && Storage::disk('public')->exists($book->cover)) {
            Storage::disk('public')->delete($book->cover);
        }

        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil dihapus!',
        ]);
    }
}
