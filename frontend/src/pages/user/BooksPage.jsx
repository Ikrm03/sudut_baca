import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, BookX } from 'lucide-react';
import api from '../../services/api';
import BookCard from '../../components/BookCard';

const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category_id') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sort, setSort] = useState('newest');

  // Load categories
  useEffect(() => {
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
    fetchCategories();
  }, []);

  // Fetch books whenever search, category, or sort changes
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const params = {};
        if (search) params.search = search;
        if (selectedCategory) params.category_id = selectedCategory;
        if (sort) params.sort = sort;

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

    fetchBooks();
  }, [search, selectedCategory, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = {};
    if (search) newParams.search = search;
    if (selectedCategory) newParams.category_id = selectedCategory;
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSort('newest');
    setSearchParams({});
  };

  return (
    <div style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
            Katalog Lengkap Buku
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            Cari buku favorit Anda berdasarkan judul, penulis, maupun kategori pilihan
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          backgroundColor: '#fff',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Cari judul buku atau penulis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            {/* Category Dropdown */}
            <div>
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

            {/* Sort Dropdown */}
            <div>
              <select
                className="form-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Terbaru</option>
                <option value="price_asc">Harga: Terendah ke Tertinggi</option>
                <option value="price_desc">Harga: Tertinggi ke Terendah</option>
              </select>
            </div>

            {/* Reset Button */}
            {(search || selectedCategory || sort !== 'newest') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                <X size={16} /> Reset Filter
              </button>
            )}
          </form>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            Menampilkan <strong>{books.length}</strong> buku
            {selectedCategory && ` dalam kategori ${categories.find(c => c.id === parseInt(selectedCategory))?.name || ''}`}
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--color-muted)' }}>Memuat data buku...</p>
          </div>
        ) : books.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '1.75rem'
          }}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}>
            <BookX size={48} color="var(--color-muted)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>
              Buku Tidak Ditemukan
            </h3>
            <p style={{ color: 'var(--color-muted)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              Tidak ada buku yang sesuai dengan kata kunci pencarian atau filter yang Anda pilih. Silakan coba kata kunci lain.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
              Tampilkan Semua Buku
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
