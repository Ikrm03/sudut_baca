import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, Users, ShoppingBag, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import api, { formatRupiah, formatDate } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: 'var(--color-dark-brown-muted)' }}>Memuat ringkasan data SudutBaca...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest-green)', letterSpacing: '-0.02em' }}>
          Statistik & Aktivitas Toko
        </h1>
        <p style={{ color: 'var(--color-dark-brown-muted)', fontSize: '0.9rem' }}>
          Ringkasan inventaris buku, pengguna terdaftar, dan arus pesanan Payment at Delivery secara real-time
        </p>
      </div>

      {/* 4 Kartu Metrik */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Card 1: Books */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-soft-beige)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-forest-green-light)',
            color: 'var(--color-forest-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-dark-brown-muted)', fontWeight: 600 }}>Total Koleksi Buku</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
              {stats?.total_books || 0}
            </div>
          </div>
        </div>

        {/* Card 2: Categories */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-soft-beige)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-sage-green-light)',
            color: 'var(--color-sage-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-dark-brown-muted)', fontWeight: 600 }}>Total Kategori</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
              {stats?.total_categories || 0}
            </div>
          </div>
        </div>

        {/* Card 3: Users */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-soft-beige)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-soft-beige-light)',
            color: 'var(--color-dark-brown)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-dark-brown-muted)', fontWeight: 600 }}>Total Pelanggan</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
              {stats?.total_users || 0}
            </div>
          </div>
        </div>

        {/* Card 4: Orders */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-soft-beige)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-forest-green-light)',
            color: 'var(--color-forest-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-dark-brown-muted)', fontWeight: 600 }}>Total Pesanan Masuk</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
              {stats?.total_orders || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Pending Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {/* Banner Pendapatan (Forest Green #315C46) */}
        <div style={{
          backgroundColor: 'var(--color-forest-green)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          padding: '1.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(49, 92, 70, 0.2)'
        }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#D3E0D6', marginBottom: '0.4rem', fontWeight: 600 }}>
              Pendapatan Terverifikasi (Lunas COD)
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-warm-cream)' }}>
              {formatRupiah(stats?.total_revenue || 0)}
            </div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)' }}>
            <TrendingUp size={32} color="var(--color-warm-cream)" />
          </div>
        </div>

        {/* Banner Pesanan Menunggu */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-soft-beige)',
          padding: '1.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-dark-brown-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>
              Pesanan Menunggu Konfirmasi (Pending)
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-warning)' }}>
              {stats?.pending_orders || 0} Transaksi
            </div>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-warning-light)', borderRadius: 'var(--radius-md)' }}>
            <Clock size={32} color="var(--color-warning)" />
          </div>
        </div>
      </div>

      {/* Tabel 5 Pesanan Terbaru */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-soft-beige)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.35rem 1.6rem',
          borderBottom: '1px solid var(--color-soft-beige)',
          backgroundColor: 'var(--color-soft-beige-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
            5 Transaksi Pesanan Terbaru
          </h3>
          <Link to="/admin/orders" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-forest-green)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Lihat Semua Pesanan <ArrowRight size={15} />
          </Link>
        </div>

        <div className="table-responsive" style={{ border: 'none' }}>
          <table className="table">
            <thead>
              <tr>
                <th>No. Pesanan</th>
                <th>Pemesan / Penerima</th>
                <th>Tanggal</th>
                <th>Total Belanja</th>
                <th>Status Pembayaran</th>
                <th>Status Pesanan</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_orders && stats.recent_orders.length > 0 ? (
                stats.recent_orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <Link to="/admin/orders" style={{ fontWeight: 700, color: 'var(--color-forest-green)' }}>
                        {o.order_number}
                      </Link>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-dark-brown)' }}>{o.recipient_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-dark-brown-muted)' }}>{o.user?.email || '-'}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-dark-brown-muted)' }}>
                      {formatDate(o.created_at)}
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--color-forest-green)' }}>
                      {formatRupiah(o.total_price)}
                    </td>
                    <td>
                      <StatusBadge type="payment" status={o.payment_status} />
                    </td>
                    <td>
                      <StatusBadge type="order" status={o.order_status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-dark-brown-muted)' }}>
                    Belum ada data pesanan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
