import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  BookOpen, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Store, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar Admin */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="brand-icon" style={{ backgroundColor: 'var(--color-primary)' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              BookSpace
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Admin Panel
            </div>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            end
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/categories" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Layers size={18} />
            <span>Kelola Kategori</span>
          </NavLink>

          <NavLink 
            to="/admin/books" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} />
            <span>Kelola Buku</span>
          </NavLink>

          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <ShoppingBag size={18} />
            <span>Kelola Pesanan</span>
          </NavLink>

          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Kelola Pengguna</span>
          </NavLink>

          <NavLink 
            to="/admin/messages" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            <span>Pesan Masuk</span>
          </NavLink>

          <div style={{ margin: '1.5rem 0 0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>

          <Link to="/" className="admin-nav-item">
            <Store size={18} />
            <span>Lihat Website Toko</span>
          </Link>

          <button 
            onClick={handleLogout} 
            className="admin-nav-item" 
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </nav>
      </aside>

      {/* Konten Utama Admin */}
      <div className="admin-content">
        <header className="admin-topbar">
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)' }}>
              Panel Administrator
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-dark)' }}>
                {user?.name || 'Administrator'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                <ShieldCheck size={12} color="var(--color-success)" /> Admin Terverifikasi
              </div>
            </div>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
