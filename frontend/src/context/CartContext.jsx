import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, isUser } = useAuth();
  const [cart, setCart] = useState({
    items: [],
    total_items: 0,
    total_price: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !isUser) {
      setCart({ items: [], total_items: 0, total_price: 0 });
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/cart');
      if (res.data.success) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isUser]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (bookId, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, requireLogin: true, message: 'Silakan login terlebih dahulu untuk menambahkan buku ke keranjang.' };
    }

    try {
      const res = await api.post('/cart/items', { book_id: bookId, quantity });
      if (res.data.success) {
        await fetchCart();
        return { success: true, message: res.data.message };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan buku ke keranjang.';
      return { success: false, message: msg };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await api.put(`/cart/items/${itemId}`, { quantity });
      if (res.data.success) {
        await fetchCart();
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui jumlah.';
      return { success: false, message: msg };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      if (res.data.success) {
        await fetchCart();
        return { success: true, message: res.data.message };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus item.';
      return { success: false, message: msg };
    }
  };

  const clearCartState = () => {
    setCart({ items: [], total_items: 0, total_price: 0 });
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCartState,
    totalItems: cart.total_items || 0,
    totalPrice: cart.total_price || 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
