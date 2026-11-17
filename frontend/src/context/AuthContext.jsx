import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bookspace_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('bookspace_token'));
  const [loading, setLoading] = useState(true);

  // Verifikasi kevalidan token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('bookspace_token');
      if (storedToken) {
        try {
          const res = await api.get('/me');
          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem('bookspace_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.error('Session expired or invalid:', err);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    if (res.data.success) {
      const { user: userData, token: userToken } = res.data.data;
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('bookspace_token', userToken);
      localStorage.setItem('bookspace_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: res.data.message };
  };

  const register = async (userData) => {
    const res = await api.post('/register', userData);
    if (res.data.success) {
      const { user: newUser, token: userToken } = res.data.data;
      setUser(newUser);
      setToken(userToken);
      localStorage.setItem('bookspace_token', userToken);
      localStorage.setItem('bookspace_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
    return { success: false, message: res.data.message };
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout');
      }
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('bookspace_token');
      localStorage.removeItem('bookspace_user');
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
