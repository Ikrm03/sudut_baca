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
      {/* Sidebar Admin (Forest Green #315C46) */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="brand-icon" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-forest-green)' }}>
            <BookOpen size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              SudutBaca
            </div>
            <div style={{ fontSize: '0.75rem', color: '#D3E0D6', fontWeight: 600 }}>
              Panel Administrator
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

          <div style={{ margin: '1.5rem 0 0.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}></div>

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
            <span>Keluar Sesi</span>
          </button>
        </nav>
      </aside>

      {/* Konten Utama Admin (Warm Cream #F8F5EC) */}
      <div className="admin-content">
        <header className="admin-topbar">
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
              Panel Administrator SudutBaca
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-dark-brown)' }}>
                {user?.name || 'Administrator'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-sage-green)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem', fontWeight: 600 }}>
                <ShieldCheck size={13} color="var(--color-forest-green)" /> Admin Terverifikasi
              </div>
            </div>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-forest-green-light)',
              color: 'var(--color-forest-green)',
              border: '1px solid var(--color-soft-beige)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
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
