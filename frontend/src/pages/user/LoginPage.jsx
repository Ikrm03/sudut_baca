import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, LogIn, AlertCircle, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleFillDemo = (type) => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@bookspace.com',
        password: 'password123',
      });
    } else {
      setFormData({
        email: 'budi@gmail.com',
        password: 'password123',
      });
    }
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError('Harap masukkan email dan password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await login(formData.email, formData.password);

      if (res.success) {
        if (res.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate(location.state?.from || '/');
        }
      } else {
        setError(res.message || 'Login gagal.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password yang Anda masukkan salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '4.5rem 0 6.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto', padding: '0 1.25rem' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-soft-beige)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="brand-icon" style={{ margin: '0 auto 1rem', width: '3.2rem', height: '3.2rem' }}>
              <BookOpen size={26} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-forest-green)', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              Masuk ke SudutBaca
            </h1>
            <p style={{ color: 'var(--color-dark-brown-muted)', fontSize: '0.9rem' }}>
              "Temukan Bacaan Favoritmu."
            </p>
          </div>

          {/* Quick Demo Fill Buttons (Asesmen BNSP) */}
          <div style={{
            padding: '0.9rem',
            backgroundColor: 'var(--color-warm-cream)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-soft-beige)',
            marginBottom: '1.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Uji Coba Cepat (Akun Demo BNSP)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.8rem', fontWeight: 700 }}
              >
                <Shield size={14} color="var(--color-forest-green)" />
                Akun Admin
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('user')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.8rem', fontWeight: 700 }}
              >
                <User size={14} color="var(--color-sage-green)" />
                Akun Customer
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.85rem' }}
            >
              <LogIn size={18} />
              {loading ? 'Memeriksa...' : 'Masuk Sekarang'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-soft-beige)', fontSize: '0.875rem', color: 'var(--color-dark-brown-muted)' }}>
            Belum punya akun?{' '}
            <Link to="/register" style={{ fontWeight: 700, color: 'var(--color-forest-green)' }}>
              Daftar di SudutBaca
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
