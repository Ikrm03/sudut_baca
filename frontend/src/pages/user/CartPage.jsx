import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatRupiah } from '../../services/api';

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (loading && cart.items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ color: 'var(--color-muted)' }}>Memuat isi keranjang belanja...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div style={{ padding: '5rem 0 6rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--color-muted)'
          }}>
            <ShoppingBag size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
            Keranjang Belanja Anda Kosong
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '420px', margin: '0 auto 2rem' }}>
            Anda belum menambahkan buku apapun ke dalam keranjang. Yuk temukan buku menarik dan mulai membaca!
          </p>
          <Link to="/books" className="btn btn-primary btn-lg">
            Mulai Belanja Buku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Keranjang Belanja
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Periksa kembali daftar buku pilihan Anda sebelum melanjutkan ke proses checkout
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(300px, 360px)',
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          {/* Items Table */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Buku</th>
                  <th>Harga Satuan</th>
                  <th style={{ textAlign: 'center' }}>Jumlah</th>
                  <th>Subtotal</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => {
                  const book = item.book;
                  const coverSrc = book.cover_url || book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80';
                  
                  return (
                    <tr key={item.id}>
                      {/* Book info */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img
                            src={coverSrc}
                            alt={book.title}
                            style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div>
                            <Link to={`/books/${book.id}`} style={{ fontWeight: 700, color: 'var(--color-dark)' }}>
                              {book.title}
                            </Link>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                              {book.author}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td style={{ fontWeight: 600 }}>
                        {formatRupiah(book.price)}
                      </td>

                      {/* Quantity Modifier */}
                      <td>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          maxWidth: '110px',
                          margin: '0 auto',
                          overflow: 'hidden'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{
                              padding: '0.35rem 0.6rem',
                              border: 'none',
                              background: '#fff',
                              cursor: item.quantity > 1 ? 'pointer' : 'not-allowed',
                              fontWeight: 700
                            }}
                          >
                            -
                          </button>
                          <span style={{ padding: '0.35rem 0.6rem', fontWeight: 600, fontSize: '0.9rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= book.stock}
                            style={{
                              padding: '0.35rem 0.6rem',
                              border: 'none',
                              background: '#fff',
                              cursor: item.quantity < book.stock ? 'pointer' : 'not-allowed',
                              fontWeight: 700
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatRupiah(book.price * item.quantity)}
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-danger)',
                            cursor: 'pointer',
                            padding: '0.4rem'
                          }}
                          title="Hapus dari keranjang"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cart Summary Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.25rem' }}>
              Ringkasan Pesanan
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.925rem', color: 'var(--color-muted)' }}>
              <span>Total Buku ({totalItems} pcs)</span>
              <span style={{ color: 'var(--color-dark)', fontWeight: 600 }}>{formatRupiah(totalPrice)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.925rem', color: 'var(--color-muted)' }}>
              <span>Biaya Pengiriman</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Gratis Ongkir</span>
            </div>

            {/* Delivery method info */}
            <div style={{
              padding: '0.85rem',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              gap: '0.65rem',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: 'var(--color-slate)',
              marginBottom: '1.5rem'
            }}>
              <Truck size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
              <span>Metode: <strong>Payment at Delivery</strong> (Bayar saat buku sampai di alamat Anda)</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--color-border)',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-dark)' }}>Total Belanja</span>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatRupiah(totalPrice)}
              </span>
            </div>

            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
              Lanjutkan ke Checkout
              <ArrowRight size={18} />
            </Link>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Link to="/books" style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                ← Lanjut Belanja Buku Lainnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
