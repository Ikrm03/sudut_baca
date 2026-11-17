import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, CheckCircle2, Layers } from 'lucide-react';
import api, { formatDate } from '../../services/api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentId(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setModalMode('edit');
    setCurrentId(cat.id);
    setFormData({ name: cat.name, description: cat.description || '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', description: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setFormLoading(true);
      let res;
      if (modalMode === 'add') {
        res = await api.post('/admin/categories', formData);
      } else {
        res = await api.put(`/admin/categories/${currentId}`, formData);
      }

      if (res.data.success) {
        setFeedback({ type: 'success', message: res.data.message });
        closeModal();
        fetchCategories();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Gagal menyimpan kategori.' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus kategori "${name}"? Seluruh buku dalam kategori ini mungkin akan terpengaruh.`)) {
      return;
    }

    try {
      const res = await api.delete(`/admin/categories/${id}`);
      if (res.data.success) {
        setFeedback({ type: 'success', message: res.data.message });
        fetchCategories();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Gagal menghapus kategori.' });
    }
  };

  return (
    <div>
      {/* Header with Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
            Kelola Kategori Buku
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Kelola klasifikasi kategori buku untuk memudahkan pencarian pengguna
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={18} /> Tambah Kategori
        </button>
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

      {/* Categories Table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>No.</th>
              <th>Nama Kategori</th>
              <th>Deskripsi</th>
              <th style={{ textAlign: 'center' }}>Total Buku</th>
              <th>Tanggal Dibuat</th>
              <th style={{ textAlign: 'center', width: '120px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Memuat data kategori...
                </td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-muted)' }}>{idx + 1}</td>
                  <td>
                    <strong style={{ color: 'var(--color-dark)', fontSize: '0.95rem' }}>{cat.name}</strong>
                  </td>
                  <td style={{ color: 'var(--color-slate)', maxWidth: '300px' }}>
                    {cat.description || '-'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {cat.books_count || 0} buku
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                    {formatDate(cat.created_at)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => openEditModal(cat)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem', color: 'var(--color-slate)' }}
                        title="Edit Kategori"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem', color: 'var(--color-danger)' }}
                        title="Hapus Kategori"
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
                  Belum ada kategori buku. Silakan klik tombol "Tambah Kategori".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add / Edit Category */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {modalMode === 'add' ? 'Tambah Kategori Baru' : 'Edit Kategori'}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Kategori</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Teknologi & Pemrograman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Kategori</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Deskripsi singkat seputar materi buku dalam kategori ini..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-outline">
                  Batal
                </button>
                <button type="submit" disabled={formLoading} className="btn btn-primary">
                  {formLoading ? 'Menyimpan...' : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
