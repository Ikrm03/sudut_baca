import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Edit3, X, CheckCircle2, AlertCircle, Phone, MapPin, User, Calendar, Truck } from 'lucide-react';
import api, { formatRupiah, formatDate } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

const OrdersAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  // Selected Order for Detail Modal / Status Update Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [newOrderStatus, setNewOrderStatus] = useState('pending');
  const [newPaymentStatus, setNewPaymentStatus] = useState('unpaid');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;

      const res = await api.get('/admin/orders', { params });
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewOrderStatus(order.order_status);
    setNewPaymentStatus(order.payment_status);
    setIsStatusModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      setUpdateLoading(true);
      const res = await api.patch(`/admin/orders/${selectedOrder.id}/status`, {
        order_status: newOrderStatus,
        payment_status: newPaymentStatus,
      });

      if (res.data.success) {
        setFeedback({ type: 'success', message: res.data.message });
        setIsStatusModalOpen(false);
        fetchOrders();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Gagal mengubah status pesanan.',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
            Kelola Seluruh Pesanan
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Verifikasi pesanan masuk, pantau pengiriman kurir, dan kelola status Payment at Delivery
          </p>
        </div>

        {/* Filter Dropdown */}
        <div style={{ minWidth: '220px' }}>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Semua Status Pesanan</option>
            <option value="pending">Menunggu Konfirmasi (Pending)</option>
            <option value="processing">Sedang Diproses (Processing)</option>
            <option value="shipped">Dalam Pengiriman (Shipped)</option>
            <option value="completed">Selesai (Completed)</option>
            <option value="cancelled">Dibatalkan (Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div style={{
          padding: '1rem 1.25rem',
          backgroundColor: feedback.type === 'success' ? 'var(--color-success-light)' : 'var(--color-danger-light)',
          color: feedback.type === 'success' ? '#065f46' : 'var(--color-danger)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem'
        }}>
          {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>No. Pesanan</th>
              <th>Penerima / Pemesan</th>
              <th>No. Telepon</th>
              <th>Tanggal</th>
              <th>Total Belanja</th>
              <th>Status Pembayaran</th>
              <th>Status Pesanan</th>
              <th style={{ textAlign: 'center', width: '130px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Memuat data pesanan...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      {o.order_number}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{o.recipient_name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{o.user?.email || '-'}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{o.phone}</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                    {formatDate(o.created_at)}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--color-slate)' }}>
                    {formatRupiah(o.total_price)}
                  </td>
                  <td>
                    <StatusBadge type="payment" status={o.payment_status} />
                  </td>
                  <td>
                    <StatusBadge type="order" status={o.order_status} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => openDetailModal(o)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem', color: 'var(--color-slate)' }}
                        title="Lihat Detail Pesanan"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => openStatusModal(o)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.35rem' }}
                        title="Perbarui Status Pesanan"
                      >
                        <Edit3 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Tidak ada pesanan yang sesuai dengan filter yang dipilih.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal 1: Detail Pesanan */}
      {isDetailModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Detail Pesanan: {selectedOrder.order_number}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{formatDate(selectedOrder.created_at)}</div>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Shipping Information */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Nama Penerima</div>
                  <div style={{ fontWeight: 600 }}>{selectedOrder.recipient_name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 700 }}>No. Telepon</div>
                  <div>{selectedOrder.phone}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Alamat Lengkap Pengiriman</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-slate)' }}>{selectedOrder.shipping_address}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Metode Pembayaran</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{selectedOrder.payment_method}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Status Saat Ini</div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                    <StatusBadge type="payment" status={selectedOrder.payment_status} />
                    <StatusBadge type="order" status={selectedOrder.order_status} />
                  </div>
                </div>
              </div>

              {/* Items List */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Daftar Buku Dipesan</h4>
              <div className="table-responsive" style={{ border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Buku</th>
                      <th>Harga Satuan</th>
                      <th style={{ textAlign: 'center' }}>Jumlah</th>
                      <th style={{ textAlign: 'right' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 600 }}>{item.book?.title || 'Buku'}</td>
                        <td>{formatRupiah(item.price)}</td>
                        <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {formatRupiah(item.subtotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Total Pembayaran:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {formatRupiah(selectedOrder.total_price)}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setIsDetailModalOpen(false)} className="btn btn-outline">
                Tutup
              </button>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  openStatusModal(selectedOrder);
                }}
                className="btn btn-primary"
              >
                Ubah Status Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Update Status Pesanan */}
      {isStatusModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Ubah Status Pesanan: {selectedOrder.order_number}
              </h3>
              <button onClick={() => setIsStatusModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Status Pesanan</label>
                  <select
                    className="form-control"
                    value={newOrderStatus}
                    onChange={(e) => {
                      setNewOrderStatus(e.target.value);
                      // Otomatis tandai Lunas jika admin memilih Completed
                      if (e.target.value === 'completed') {
                        setNewPaymentStatus('paid');
                      }
                    }}
                    required
                  >
                    <option value="pending">Pending (Menunggu Konfirmasi)</option>
                    <option value="processing">Processing (Sedang Diproses Toko)</option>
                    <option value="shipped">Shipped (Dalam Pengiriman Kurir)</option>
                    <option value="completed">Completed (Pesanan Selesai Diterima)</option>
                    <option value="cancelled">Cancelled (Pesanan Dibatalkan)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status Pembayaran (Payment at Delivery)</label>
                  <select
                    className="form-control"
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    required
                  >
                    <option value="unpaid">Unpaid (Belum Bayar / Menunggu Buku Tiba)</option>
                    <option value="paid">Paid (Lunas - Uang Telah Diterima)</option>
                  </select>
                </div>

                {newOrderStatus === 'cancelled' && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-danger)' }}>
                    * Catatan: Jika status dibatalkan (Cancelled), stok buku yang sebelumnya dipesan akan otomatis dikembalikan ke sistem.
                  </p>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsStatusModalOpen(false)} className="btn btn-outline">
                  Batal
                </button>
                <button type="submit" disabled={updateLoading} className="btn btn-primary">
                  {updateLoading ? 'Memperbarui...' : 'Simpan Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersAdminPage;
