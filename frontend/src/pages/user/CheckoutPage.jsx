import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api, { formatRupiah } from '../../services/api';

const CheckoutPage = () => {
  const { cart, totalPrice, totalItems, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipient_name: user?.name || '',
    phone: '',
    shipping_address: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cart.items.length === 0) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Keranjang Anda kosong</h2>
        <p style={{ color: 'var(--color-muted)', margin: '1rem 0 2rem' }}>
          Tambahkan buku terlebih dahulu sebelum melakukan checkout.
        </p>
        <Link to="/books" className="btn btn-primary">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.recipient_name.trim() || !formData.phone.trim() || !formData.shipping_address.trim()) {
      setError('Harap lengkapi semua data formulir pengiriman.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await api.post('/checkout', formData);

      if (res.data.success) {
        await fetchCart(); // Kosongkan keranjang di client
        const createdOrder = res.data.data;
        navigate(`/orders/${createdOrder.id}`, {
          state: { isNewOrder: true, orderNumber: createdOrder.order_number }
        });
      } else {
        setError(res.data.message || 'Gagal memproses pesanan.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat checkout. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Kembali ke Keranjang
          </Link>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Checkout Pesanan
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Lengkapi data alamat pengiriman untuk proses pengantaran buku ke lokasi Anda
        </p>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(320px, 400px)',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Shipping Form */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
              Informasi Penerima & Alamat Pengiriman
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Lengkap Penerima</label>
                <input
                  type="text"
                  name="recipient_name"
                  className="form-control"
                  placeholder="Contoh: Budi Pratama"
                  value={formData.recipient_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor Telepon / WhatsApp Aktif</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Lengkap Pengiriman</label>
                <textarea
                  name="shipping_address"
                  className="form-control"
                  rows={4}
                  placeholder="Masukkan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota, dan kode pos..."
                  value={formData.shipping_address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Payment Method Notice */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #c7d2fe'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Truck size={24} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-slate)', marginBottom: '0.25rem' }}>
                      Metode Pembayaran: Payment at Delivery (COD)
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
                      Sesuai ketentuan, Anda cukup menyiapkan uang pas dan membayarkannya secara langsung kepada kurir saat buku tiba di alamat Anda.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '2rem' }}
              >
                {loading ? 'Memproses Transaksi...' : `Konfirmasi & Buat Pesanan (${formatRupiah(totalPrice)})`}
              </button>
            </form>
          </div>

          {/* Order Items Review Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.25rem' }}>
              Rincian Item ({totalItems} buku)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
              {cart.items.map((item) => {
                const book = item.book;
                const coverSrc = book.cover_url || book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80';
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                    <img
                      src={coverSrc}
                      alt={book.title}
                      style={{ width: '42px', height: '56px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {book.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                        {item.quantity} x {formatRupiah(book.price)}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-slate)' }}>
                      {formatRupiah(book.price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <span>Subtotal Item</span>
                <span style={{ color: 'var(--color-dark)', fontWeight: 600 }}>{formatRupiah(totalPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <span>Biaya Pengiriman</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Gratis</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total Pembayaran</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
