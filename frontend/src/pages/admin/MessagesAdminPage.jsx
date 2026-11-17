import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Eye, X, AlertCircle, CheckCircle2, Mail, Calendar, User } from 'lucide-react';
import api, { formatDate } from '../../services/api';

const MessagesAdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/messages');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching admin messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id, subject) => {
    if (!window.confirm(`Hapus pesan "${subject}"?`)) {
      return;
    }

    try {
      const res = await api.delete(`/admin/messages/${id}`);
      if (res.data.success) {
        setFeedback({ type: 'success', message: res.data.message });
        if (selectedMsg?.id === id) setSelectedMsg(null);
        fetchMessages();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Gagal menghapus pesan.' });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
          Pesan Masuk (Contact Messages)
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
          Tinjau seluruh pesan dan pertanyaan yang dikirimkan oleh pengguna atau pengunjung website
        </p>
      </div>

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

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>No.</th>
              <th>Pengirim</th>
              <th>Subjek Pesan</th>
              <th>Ringkasan Pesan</th>
              <th>Tanggal</th>
              <th style={{ textAlign: 'center', width: '120px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Memuat data pesan...
                </td>
              </tr>
            ) : messages.length > 0 ? (
              messages.map((m, idx) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-muted)' }}>{idx + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{m.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{m.email}</div>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--color-slate)' }}>{m.subject}</strong>
                  </td>
                  <td style={{ color: 'var(--color-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.message}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                    {formatDate(m.created_at)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => setSelectedMsg(m)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem', color: 'var(--color-slate)' }}
                        title="Buka Pesan Lengkap"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.subject)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem', color: 'var(--color-danger)' }}
                        title="Hapus Pesan"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Belum ada pesan yang masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Message Modal */}
      {selectedMsg && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Detail Pesan Masuk</h3>
              <button onClick={() => setSelectedMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>
                  {selectedMsg.subject}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={14} /> Pengirim: <strong style={{ color: 'var(--color-slate)' }}>{selectedMsg.name}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Mail size={14} /> Email: {selectedMsg.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} /> Tanggal: {formatDate(selectedMsg.created_at)}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Isi Pesan:
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  lineHeight: '1.6',
                  color: 'var(--color-dark)',
                  whiteSpace: 'pre-line',
                  fontSize: '0.925rem'
                }}>
                  {selectedMsg.message}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedMsg(null)} className="btn btn-outline">
                Tutup
              </button>
              <button
                onClick={() => handleDelete(selectedMsg.id, selectedMsg.subject)}
                className="btn btn-danger"
              >
                Hapus Pesan Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesAdminPage;
