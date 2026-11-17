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
        <p style={{ color: 'var(--color-muted)' }}>Memuat data statistik dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
          Ringkasan Statistik Toko
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
          Pantau seluruh aktivitas katalog, pengguna, dan transaksi pesanan BookSpace secara real-time
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Card 1: Books */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Koleksi Buku</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              {stats?.total_books || 0}
            </div>
          </div>
        </div>

        {/* Card 2: Categories */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#e0f2fe',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Kategori</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              {stats?.total_categories || 0}
            </div>
          </div>
        </div>

        {/* Card 3: Users */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-success-light)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Pelanggan</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              {stats?.total_users || 0}
            </div>
          </div>
        </div>

        {/* Card 4: Orders */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-warning-light)',
            color: '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Pesanan Masuk</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              {stats?.total_orders || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          color: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
              Pendapatan Terverifikasi (Lunas)
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#38bdf8' }}>
              {formatRupiah(stats?.total_revenue || 0)}
            </div>
          </div>
          <TrendingUp size={36} color="#38bdf8" />
        </div>

        <div style={{
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.35rem' }}>
              Pesanan Menunggu Konfirmasi (Pending)
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#b45309' }}>
              {stats?.pending_orders || 0} Transaksi
            </div>
          </div>
          <Clock size={36} color="#b45309" />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-dark)' }}>
            5 Pesanan Terbaru
          </h3>
          <Link to="/admin/orders" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Lihat Semua Pesanan <ArrowRight size={14} />
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
                      <Link to="/admin/orders" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {o.order_number}
                      </Link>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.recipient_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{o.user?.email || '-'}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                      {formatDate(o.created_at)}
                    </td>
                    <td style={{ fontWeight: 700 }}>
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
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-muted)' }}>
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
