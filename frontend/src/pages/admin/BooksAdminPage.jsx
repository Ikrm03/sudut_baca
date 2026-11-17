import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import api, { formatRupiah, formatDate } from '../../services/api';

const BooksAdminPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category_id: '',
    price: '',
    stock: '',
    description: '',
  });

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (selectedCategory) params.category_id = selectedCategory;

      const res = await api.get('/books', { params });
      if (res.data.success) {
        setBooks(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [search, selectedCategory]);

  const openAddModal = () => {
    setModalMode('add');
    setCurrentId(null);
    setFormData({
      title: '',
      author: '',
      category_id: categories[0]?.id || '',
      price: '',
      stock: '',
      description: '',
    });
    setCoverFile(null);
    setCoverPreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setModalMode('edit');
    setCurrentId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      category_id: book.category_id,
      price: book.price,
      stock: book.stock,
      description: book.description,
    });
    setCoverFile(null);
    setCoverPreview(book.cover_url || book.cover);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormLoading(true);

      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('category_id', formData.category_id);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('description', formData.description);

      if (coverFile) {
        data.append('cover', coverFile);
      }

      let res;
      if (modalMode === 'add') {
        res = await api.post('/admin/books', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Method POST to /admin/books/{id} handled in BookController
        res = await api.post(`/admin/books/${currentId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data.success) {
        setFeedback({ type: 'success', message: res.data.message });
        closeModal();
        fetchBooks();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan data buku.',
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus buku "${title}" dari katalog?`)) {
      return;
    }

    try {
      const res = await api.delete(`/admin/books/${id}`);
      if (res.data.success) {
        setFeedback({ type: 'success', message: res.data.message });
        fetchBooks();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Gagal menghapus buku.' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
            Kelola Katalog Buku
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            Tambah, perbarui informasi, atur stok, dan upload cover gambar buku
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={18} /> Tambah Buku Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Cari judul buku atau nama penulis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ minWidth: '200px' }}>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
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

      {/* Books Table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Cover</th>
              <th>Judul Buku</th>
              <th>Penulis</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th style={{ textAlign: 'center' }}>Stok</th>
              <th style={{ textAlign: 'center', width: '120px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Memuat data buku...
                </td>
              </tr>
            ) : books.length > 0 ? (
              books.map((b) => {
                const coverSrc = b.cover_url || b.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&auto=format&fit=crop&q=80';
                return (
                  <tr key={b.id}>
                    <td>
                      <img
                        src={coverSrc}
                        alt={b.title}
                        style={{ width: '42px', height: '56px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f1f5f9' }}
                      />
                    </td>
                    <td>
                      <strong style={{ color: 'var(--color-dark)', fontSize: '0.95rem' }}>{b.title}</strong>
                    </td>
                    <td style={{ color: 'var(--color-muted)' }}>{b.author}</td>
                    <td>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {b.category?.name || 'Umum'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-slate)' }}>
                      {formatRupiah(b.price)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: b.stock > 0 ? 'var(--color-success-light)' : 'var(--color-danger-light)',
                        color: b.stock > 0 ? '#047857' : '#b91c1c'
                      }}>
                        {b.stock}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => openEditModal(b)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem', color: 'var(--color-slate)' }}
                          title="Edit Buku"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem', color: 'var(--color-danger)' }}
                          title="Hapus Buku"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Tidak ada data buku yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add / Edit Book */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {modalMode === 'add' ? 'Tambah Buku Baru' : 'Edit Data Buku'}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="form-group">
                  <label className="form-label">Judul Buku</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Mastering React & Modern JavaScript"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nama Penulis</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contoh: Alexandria Rivers"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kategori</label>
                    <select
                      className="form-control"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Harga Buku (Rp)</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Contoh: 125000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Jumlah Stok</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Contoh: 20"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Deskripsi Lengkap Buku</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Tuliskan rangkuman isi dan sinopsis buku..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* Cover File Upload */}
                <div className="form-group">
                  <label className="form-label">Upload Cover Gambar Buku (Opsional)</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {coverPreview && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={coverPreview}
                        alt="Preview"
                        style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                        Pratinjau Cover Buku
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-outline">
                  Batal
                </button>
                <button type="submit" disabled={formLoading} className="btn btn-primary">
                  {formLoading ? 'Menyimpan...' : 'Simpan Data Buku'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksAdminPage;
