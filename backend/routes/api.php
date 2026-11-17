<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - BookSpace Bookstore
|--------------------------------------------------------------------------
| Seluruh rute API untuk aplikasi BookSpace.
| Menggunakan JSON responses dan proteksi Laravel Sanctum.
*/

// ==========================================
// 1. PUBLIC ROUTES (Dapat diakses siapa saja)
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Katalog Kategori & Buku
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);

// Kirim Pesan Kontak (Bisa oleh tamu atau user)
Route::post('/contact', [ContactController::class, 'send']);


// ==============================================================
// 2. AUTHENTICATED ROUTES (Perlu login / Bearer Token Sanctum)
// ==============================================================
Route::middleware('auth:sanctum')->group(function () {

    // Auth & Profil
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Keranjang Belanja (Customer)
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/items', [CartController::class, 'addItem']);
    Route::put('/cart/items/{id}', [CartController::class, 'updateItem']);
    Route::delete('/cart/items/{id}', [CartController::class, 'removeItem']);

    // Checkout & Pesanan Customer
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'userOrders']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // ==============================================================
    // 3. ADMIN ONLY ROUTES (Dilindungi Middleware 'role:admin')
    // ==============================================================
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        
        // Statistik & Manajemen Pengguna
        Route::get('/stats', [AdminDashboardController::class, 'stats']);
        Route::get('/users', [AdminDashboardController::class, 'users']);

        // Kelola Kategori (CRUD)
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

        // Kelola Buku (CRUD + Cover Upload)
        Route::post('/books', [BookController::class, 'store']);
        Route::post('/books/{id}', [BookController::class, 'update']);
        Route::delete('/books/{id}', [BookController::class, 'destroy']);

        // Kelola Pesanan Pelanggan
        Route::get('/orders', [OrderController::class, 'adminOrders']);
        Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);

        // Pesan Masuk (Contact Messages)
        Route::get('/messages', [ContactController::class, 'adminMessages']);
        Route::delete('/messages/{id}', [ContactController::class, 'destroy']);
    });
});
