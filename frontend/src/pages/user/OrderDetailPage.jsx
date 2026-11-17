import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Truck, Phone, MapPin, User, Package, Calendar } from 'lucide-react';
import api, { formatRupiah, formatDate } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

const OrderDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isNewOrder = location.state?.isNewOrder;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/${id}`);
        if (res.data.success) {
          setOrder(res.data.data);
        } else {
          setError(res.data.message || 'Pesanan tidak ditemukan.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Pesanan tidak ditemukan.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ color: 'var(--color-muted)' }}>Memuat detail pesanan...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>{error || 'Pesanan Tidak Ditemukan'}</h2>
        <Link to="/orders" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Kembali ke Daftar Pesanan
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Kembali ke Daftar Pesanan
          </Link>
        </div>

        {/* Success Banner if redirected from checkout */}
        {isNewOrder && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--color-success-light)',
            color: '#065f46',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid #a7f3d0'
          }}>
            <CheckCircle2 size={32} color="var(--color-success)" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                Pesanan Anda Berhasil Dibuat!
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Nomor pesanan Anda adalah <strong>{order.order_number}</strong>. Pembayaran dilakukan secara tunai/langsung saat kurir mengantarkan buku ke alamat Anda (Payment at Delivery).
              </p>
            </div>
          </div>
        )}

        {/* Order Header Card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
                Detail Transaksi
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                {order.order_number}
              </h2>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem' }}>
                <Calendar size={14} /> Dipesan pada {formatDate(order.created_at)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <StatusBadge type="payment" status={order.payment_status} />
              <StatusBadge type="order" status={order.order_status} />
            </div>
          </div>
        </div>

        {/* Two Columns Grid: Shipping Info & Ordered Items */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) 1fr',
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          {/* Shipping Info Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.25rem' }}>
              Informasi Pengiriman
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <User size={18} color="var(--color-muted)" style={{ marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Penerima</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{order.recipient_name}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Phone size={18} color="var(--color-muted)" style={{ marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>No. Telepon</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{order.phone}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--color-muted)" style={{ marginTop: '3px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Alamat Pengiriman</div>
                  <div style={{ color: 'var(--color-dark)', lineHeight: '1.5', fontSize: '0.925rem' }}>
                    {order.shipping_address}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Truck size={18} color="var(--color-primary)" style={{ marginTop: '3px' }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Metode Pembayaran</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{order.payment_method}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                      Pembayaran tunai saat barang diterima langsung di lokasi.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Items Table Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.25rem' }}>
              Daftar Buku yang Dipesan
            </h3>

            <div className="table-responsive" style={{ border: 'none' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Buku</th>
                    <th>Harga</th>
                    <th style={{ textAlign: 'center' }}>Jumlah</th>
                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => {
                    const book = item.book;
                    const coverSrc = book?.cover_url || book?.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80';
                    return (
                      <tr key={item.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <img
                              src={coverSrc}
                              alt={book?.title || 'Book'}
                              style={{ width: '40px', height: '54px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--color-dark)' }}>
                                {book?.title || 'Buku'}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                                {book?.author || '-'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{formatRupiah(item.price)}</td>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {formatRupiah(item.subtotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Total calculation */}
            <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '1.5rem', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <span>Subtotal Item</span>
                <span style={{ color: 'var(--color-dark)', fontWeight: 600 }}>{formatRupiah(order.total_price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <span>Biaya Pengiriman</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Gratis Ongkir</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-dark)' }}>Total Pembayaran</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {formatRupiah(order.total_price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
