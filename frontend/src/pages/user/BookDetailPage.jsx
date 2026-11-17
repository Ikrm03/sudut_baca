import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, AlertCircle, BookOpen } from 'lucide-react';
import api, { formatRupiah } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/books/${id}`);
        if (res.data.success) {
          setBook(res.data.data);
        } else {
          setError(res.data.message || 'Buku tidak ditemukan.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Buku tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= (book?.stock || 1)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = async () => {
    if (!book) return;

    setAdding(true);
    const res = await addToCart(book.id, quantity);
    setAdding(false);

    if (res.requireLogin) {
      navigate('/login');
      return;
    }

    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } else {
      alert(res.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ color: 'var(--color-muted)' }}>Memuat detail buku...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--color-danger)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{error || 'Buku Tidak Ditemukan'}</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>Buku yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
        <Link to="/books" className="btn btn-primary">
          <ArrowLeft size={16} /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const coverSrc = (!imgError && (book.cover_url || book.cover)) 
    ? (book.cover_url || book.cover) 
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=80';

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Back navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/books" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Kembali ke Katalog Buku
          </Link>
        </div>

        {/* Book Details Container */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 360px) 1fr',
            gap: '3rem'
          }}>
            {/* Book Cover Image */}
            <div>
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#f3f4f6',
                border: '1px solid var(--color-border)',
                aspectRatio: '3 / 4'
              }}>
                <img
                  src={coverSrc}
                  alt={book.title}
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Guarantees Box */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                  <Truck size={18} color="var(--color-primary)" />
                  <span>Metode <strong>Payment at Delivery</strong> (Bayar saat pesanan tiba)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--color-slate)' }}>
                  <ShieldCheck size={18} color="var(--color-success)" />
                  <span>Kondisi buku 100% original & tersegel</span>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '0.3rem 0.85rem',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem'
              }}>
                {book.category?.name || 'Umum'}
              </div>

              <h1 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 800,
                color: 'var(--color-dark)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem'
              }}>
                {book.title}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
                Penulis: <strong style={{ color: 'var(--color-slate)' }}>{book.author}</strong>
              </p>

              {/* Price & Stock */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.25rem',
                padding: '1.25rem 0',
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {formatRupiah(book.price)}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  backgroundColor: book.stock > 0 ? 'var(--color-success-light)' : 'var(--color-danger-light)',
                  color: book.stock > 0 ? '#047857' : '#b91c1c'
                }}>
                  {book.stock > 0 ? `Tersedia: ${book.stock} buah` : 'Stok Habis'}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                  Deskripsi Buku
                </h3>
                <p style={{ color: 'var(--color-slate)', lineHeight: '1.8', fontSize: '0.975rem', whiteSpace: 'pre-line' }}>
                  {book.description}
                </p>
              </div>

              {/* Add to Cart Actions */}
              {!isAdmin && book.stock > 0 && (
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  {/* Quantity Controller */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: '#fff',
                        border: 'none',
                        cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--color-slate)'
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      padding: '0.75rem 1.25rem',
                      fontWeight: 700,
                      fontSize: '1rem',
                      minWidth: '3rem',
                      textAlign: 'center'
                    }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= book.stock}
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: '#fff',
                        border: 'none',
                        cursor: quantity < book.stock ? 'pointer' : 'not-allowed',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--color-slate)'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, minWidth: '200px' }}
                  >
                    {added ? (
                      <>
                        <Check size={20} />
                        Berhasil Ditambahkan!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        {adding ? 'Menambahkan...' : `Masukkan Keranjang (${formatRupiah(book.price * quantity)})`}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
