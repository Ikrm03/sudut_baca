import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, ShoppingBag } from 'lucide-react';
import api, { formatRupiah, formatDate } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get('/orders');
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ color: 'var(--color-muted)' }}>Memuat riwayat pesanan...</p>
      </div>
    );
  }

  if (orders.length === 0) {
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
            <Package size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
            Belum Ada Riwayat Pesanan
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '420px', margin: '0 auto 2rem' }}>
            Anda belum pernah membuat transaksi di SudutBaca. Silakan temukan buku impian Anda di katalog!
          </p>
          <Link to="/books" className="btn btn-primary btn-lg">
            Mulai Belanja Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Riwayat Pesanan Saya
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Pantau progres pengiriman dan status pembayaran buku yang telah Anda pesan
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map((order) => {
            const firstItem = order.items?.[0];
            const otherItemsCount = (order.items?.length || 1) - 1;

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--color-border)',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>No. Pesanan: </span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-slate)' }}>{order.order_number}</strong>
                    <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>|</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{formatDate(order.created_at)}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <StatusBadge type="payment" status={order.payment_status} />
                    <StatusBadge type="order" status={order.order_status} />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.5rem'
                }}>
                  {/* Items Preview */}
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, minWidth: '240px' }}>
                    {firstItem?.book && (
                      <img
                        src={firstItem.book.cover_url || firstItem.book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80'}
                        alt={firstItem.book.title}
                        style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--color-dark)' }}>
                        {firstItem?.book?.title || 'Item Pesanan'}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                        {firstItem?.quantity} pcs x {formatRupiah(firstItem?.price)}
                        {otherItemsCount > 0 && ` (+ ${otherItemsCount} buku lainnya)`}
                      </div>
                    </div>
                  </div>

                  {/* Total & Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Total Belanja</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                        {formatRupiah(order.total_price)}
                      </div>
                    </div>

                    <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm">
                      Detail Pesanan
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
