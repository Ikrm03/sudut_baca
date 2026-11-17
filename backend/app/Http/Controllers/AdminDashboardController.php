<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * Ringkasan Statistik untuk Dashboard Admin
     */
    public function stats()
    {
        $totalBooks = Book::count();
        $totalCategories = Category::count();
        $totalUsers = User::where('role', 'user')->count();
        $totalOrders = Order::count();
        
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total_price');
        $pendingOrders = Order::where('order_status', 'pending')->count();

        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_books' => $totalBooks,
                'total_categories' => $totalCategories,
                'total_users' => $totalUsers,
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'pending_orders' => $pendingOrders,
                'recent_orders' => $recentOrders,
            ],
        ]);
    }

    /**
     * Daftar Pengguna Terdaftar (Admin)
     */
    public function users()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $users,
        ]);
    }
}
