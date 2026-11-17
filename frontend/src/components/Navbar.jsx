import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingBag, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo & Name SudutBaca */}
        <Link to="/" className="brand-logo" title="SudutBaca – Temukan Bacaan Favoritmu">
          <div className="brand-icon">
            <BookOpen size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ lineHeight: '1.1' }}>SudutBaca</span>
            <span style={{ fontSize: '0.675rem', fontWeight: 600, color: 'var(--color-sage-green)', letterSpacing: '0.02em' }}>
              Online Bookstore
            </span>
          </div>
        </Link>

        {/* Navigasi Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Beranda
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Katalog Buku
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Tentang Kami
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Hubungi Kami
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Keranjang Belanja (Customer Only) */}
          {!isAdmin && (
            <Link to="/cart" className="cart-icon-btn" title="Keranjang Belanja">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          )}

          {/* Autentikasi Pengguna */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {isAdmin ? (
                <Link to="/admin/dashboard" className="btn btn-primary btn-sm">
                  <LayoutDashboard size={16} />
                  Dashboard Admin
                </Link>
              ) : (
                <Link to="/orders" className="btn btn-outline btn-sm" title="Riwayat Pesanan">
                  <Package size={16} />
                  Pesanan Saya
                </Link>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-dark-brown)' }}>
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '0.45rem', border: 'none', color: 'var(--color-dark-brown-muted)' }}
                  title="Keluar"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Masuk
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
