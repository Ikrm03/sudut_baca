import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ShieldCheck, Truck, Sparkles, Compass, Feather } from 'lucide-react';
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
      {/* Hero Section SudutBaca */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              {/* Badge Tagline */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.95rem',
                backgroundColor: 'var(--color-forest-green-light)',
                color: 'var(--color-forest-green)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                border: '1px solid var(--color-soft-beige)'
              }}>
                <Feather size={14} color="var(--color-forest-green)" />
                <span>Temukan Bacaan Favoritmu</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 3.4rem)',
                fontWeight: 800,
                color: 'var(--color-forest-green)',
                lineHeight: 1.18,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}>
                Ruang Nyaman Menemukan Buku Terbaik di <span style={{ color: 'var(--color-sage-green)' }}>SudutBaca</span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--color-dark-brown-muted)',
                lineHeight: 1.7,
                marginBottom: '2.25rem',
                maxWidth: '540px'
              }}>
                Koleksi buku kurasi pilihan untuk memperkaya wawasan, inspirasi, dan ketenangan pikiran. Nikmati kemudahan memesan dengan jaminan <strong>Payment at Delivery (COD)</strong> — bayar tunai saat buku tiba di genggaman Anda.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/books" className="btn btn-primary btn-lg">
                  Jelajahi Katalog Pustaka
                  <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg">
                  Tentang SudutBaca
                </Link>
              </div>
            </div>

            {/* Visual Hero Card SudutBaca */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--color-dark-brown)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                maxWidth: '420px',
                width: '100%',
                border: '1px solid var(--color-soft-beige)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-soft-beige)' }}>
                  <div className="brand-icon">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>SudutBaca</h3>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-sage-green)', fontWeight: 600 }}>Toko Buku Online Terpercaya</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.6rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-sm)' }}>
                      <Truck size={20} color="var(--color-forest-green)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark-brown)' }}>Payment at Delivery</h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-dark-brown-muted)', lineHeight: '1.5' }}>
                        Bayar aman langsung kepada kurir saat buku sampai di alamat Anda.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.6rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-sm)' }}>
                      <ShieldCheck size={20} color="var(--color-forest-green)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark-brown)' }}>Jaminan Buku Original</h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-dark-brown-muted)', lineHeight: '1.5' }}>
                        Seluruh koleksi pustaka terjamin keasliannya dan bersegel rapi.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ padding: '0.6rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-sm)' }}>
                      <Compass size={20} color="var(--color-forest-green)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark-brown)' }}>Kurasi Kategori Lengkap</h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-dark-brown-muted)', lineHeight: '1.5' }}>
                        Novel, komik, pengembangan diri, dan karya sastra pilihan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Pilihan Pills */}
      <section style={{ padding: '3rem 0 1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.35rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                Kategori Bacaan Pilihan
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-dark-brown-muted)' }}>
                Pilih topik bacaan yang paling Anda minati hari ini
              </p>
            </div>
            <Link to="/books" style={{ fontSize: '0.9rem', color: 'var(--color-forest-green)', fontWeight: 700 }}>
              Semua Kategori →
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', overflowX: 'auto', paddingBottom: '0.75rem' }}>
            <Link
              to="/books"
              style={{
                padding: '0.55rem 1.35rem',
                backgroundColor: 'var(--color-forest-green)',
                border: '1px solid var(--color-forest-green)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#FFFFFF',
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
                  padding: '0.55rem 1.35rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-soft-beige)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-dark-brown)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-sage-green)';
                  e.currentTarget.style.color = 'var(--color-forest-green)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-soft-beige)';
                  e.currentTarget.style.color = 'var(--color-dark-brown)';
                }}
              >
                {cat.name} ({cat.books_count || 0})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Katalog Buku Terbaru */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest-green)', letterSpacing: '-0.02em' }}>
                Katalog Pustaka Terbaru
              </h2>
              <p style={{ color: 'var(--color-dark-brown-muted)', fontSize: '0.95rem' }}>
                Buku-buku berkualitas yang siap menemani waktu membaca Anda
              </p>
            </div>
            <Link to="/books" className="btn btn-outline btn-sm">
              Lihat Selengkapnya
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <p style={{ color: 'var(--color-dark-brown-muted)' }}>Memuat katalog buku SudutBaca...</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '1.75rem'
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
