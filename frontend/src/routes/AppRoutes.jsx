import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Route Guards
import { ProtectedRoute, GuestRoute } from './ProtectedRoute';

// User / Public Pages
import HomePage from '../pages/user/HomePage';
import BooksPage from '../pages/user/BooksPage';
import BookDetailPage from '../pages/user/BookDetailPage';
import CartPage from '../pages/user/CartPage';
import CheckoutPage from '../pages/user/CheckoutPage';
import OrdersPage from '../pages/user/OrdersPage';
import OrderDetailPage from '../pages/user/OrderDetailPage';
import AboutPage from '../pages/user/AboutPage';
import ContactPage from '../pages/user/ContactPage';
import LoginPage from '../pages/user/LoginPage';
import RegisterPage from '../pages/user/RegisterPage';

// Admin Pages
import DashboardPage from '../pages/admin/DashboardPage';
import CategoriesPage from '../pages/admin/CategoriesPage';
import BooksAdminPage from '../pages/admin/BooksAdminPage';
import OrdersAdminPage from '../pages/admin/OrdersAdminPage';
import UsersAdminPage from '../pages/admin/UsersAdminPage';
import MessagesAdminPage from '../pages/admin/MessagesAdminPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. RUTE PUBLIK & CUSTOMER (MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Rute Khusus Tamu (Guest Only) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rute Terproteksi Customer (Harus Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Route>
      </Route>

      {/* 2. RUTE ADMINISTRATOR (AdminLayout & Role Guard) */}
      <Route element={<ProtectedRoute requireAdmin={true} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/books" element={<BooksAdminPage />} />
          <Route path="/admin/orders" element={<OrdersAdminPage />} />
          <Route path="/admin/users" element={<UsersAdminPage />} />
          <Route path="/admin/messages" element={<MessagesAdminPage />} />
        </Route>
      </Route>

      {/* 3. FALLBACK 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
