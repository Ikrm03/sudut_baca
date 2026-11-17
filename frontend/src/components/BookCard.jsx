import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { formatRupiah } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAdding(true);
    const res = await addToCart(book.id, 1);
    setAdding(false);

    if (res.requireLogin) {
      navigate('/login');
      return;
    }

    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      alert(res.message);
    }
  };

  const coverSrc = (!imgError && (book.cover_url || book.cover)) 
    ? (book.cover_url || book.cover) 
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=80';

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`} className="book-cover-wrapper">
        <img
          src={coverSrc}
          alt={book.title}
          className="book-cover-img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {book.stock <= 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(70, 61, 50, 0.85)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.05em'
          }}>
            STOK HABIS
          </div>
        )}
      </Link>

      <div className="book-content">
        <span className="book-category">
          {book.category?.name || 'Umum'}
        </span>

        <Link to={`/books/${book.id}`}>
          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>
        </Link>

        <p className="book-author">oleh {book.author}</p>

        <div className="book-footer">
          <div>
            <div className="book-price">{formatRupiah(book.price)}</div>
            <span style={{
              fontSize: '0.75rem',
              color: book.stock > 0 ? 'var(--color-forest-green)' : 'var(--color-danger)',
              fontWeight: 700
            }}>
              {book.stock > 0 ? `Tersedia: ${book.stock}` : 'Habis'}
            </span>
          </div>

          {!isAdmin && (
            <button
              onClick={handleAddToCart}
              disabled={adding || book.stock <= 0}
              className={`btn btn-sm ${added ? 'btn-secondary' : 'btn-primary'}`}
              style={{ padding: '0.5rem 0.85rem' }}
              title={book.stock > 0 ? 'Tambahkan ke keranjang' : 'Stok habis'}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>Ada</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>+ Beli</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
