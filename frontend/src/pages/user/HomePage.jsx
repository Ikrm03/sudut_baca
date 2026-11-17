import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ShieldCheck, Truck, Sparkles, Search } from 'lucide-react';
import api from '../../services/api';
import BookCard from '../../components/BookCard';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksRes, catsRes] = await Promise.all([
          api.get('/books'),
          api.get('/categories')
        ]);
        if (booksRes.data.success) {
          setBooks(booksRes.data.data);
        }
        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={14} /> Toko Buku Online Terpercaya
              </div>
              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.25rem)',
                fontWeight: 800,
                color: 'var(--color-dark)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}>
                Jelajahi Dunia Literasi Bersama <span style={{ color: 'var(--color-primary)' }}>BookSpace</span>
              </h1>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '520px'
              }}>
                Temukan buku pilihan dari berbagai kategori berkualitas. Nikmati kemudahan memesan dengan metode <strong>Payment at Delivery</strong> — bayar saat buku sampai di tangan Anda.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/books" className="btn btn-primary btn-lg">
                  Jelajahi Katalog Buku
                  <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Pelajari Layanan Kami
                </Link>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: '#fff',
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                maxWidth: '400px',
                width: '100%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div className="brand-icon">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>BookSpace Store</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Pengiriman Cepat & Terpercaya</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)' }}>
                      <Truck size={20} color="#818cf8" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Payment at Delivery</h4>
                      <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>Bayar aman di tempat saat pesanan tiba.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)' }}>
                      <ShieldCheck size={20} color="#34d399" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>100% Produk Asli</h4>
                      <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>Koleksi buku bergaransi dan terpercaya.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Chips */}
      <section style={{ padding: '2.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)' }}>
              Kategori Pilihan
            </h2>
            <Link to="/books" style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              Semua Kategori →
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <Link
              to="/books"
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-dark)',
                whiteSpace: 'nowrap'
              }}
            >
              Semua Buku
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/books?category_id=${cat.id}`}
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-dark)',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.name} ({cat.books_count || 0})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Grid */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
                Katalog Buku Terbaru
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                Koleksi buku terlengkap yang siap menambah wawasan Anda
              </p>
            </div>
            <Link to="/books" className="btn btn-outline btn-sm">
              Lihat Selengkapnya
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--color-muted)' }}>Memuat katalog buku...</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem'
            }}>
              {books.slice(0, 8).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
