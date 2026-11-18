import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Truck, Headphones, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Kolom 1: Profil Toko SudutBaca */}
          <div>
            <div className="brand-logo" style={{ color: 'var(--color-warm-cream)', marginBottom: '0.75rem' }}>
              <div className="brand-icon" style={{ backgroundColor: 'var(--color-warm-cream)', color: 'var(--color-forest-green)' }}>
                <BookOpen size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ lineHeight: '1.1' }}>SudutBaca</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-soft-beige)', fontStyle: 'italic' }}>
                  "Temukan Bacaan Favoritmu."
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: '#D3E0D6', maxWidth: '320px', marginTop: '0.5rem' }}>
              SudutBaca adalah ruang membaca online yang menghadirkan buku-buku pilihan berkualitas dalam suasana hangat dan nyaman, dilengkapi metode aman <strong>Payment at Delivery</strong>.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h4 style={{ color: 'var(--color-warm-cream)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Jelajahi SudutBaca
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><Link to="/">Beranda Utama</Link></li>
              <li><Link to="/books">Katalog Seluruh Buku</Link></li>
              <li><Link to="/about">Tentang SudutBaca</Link></li>
              <li><Link to="/contact">Hubungi Pengelola</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Toko */}
          <div>
            <h4 style={{ color: 'var(--color-warm-cream)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Layanan & Komitmen
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#D3E0D6' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Truck size={17} color="var(--color-soft-beige)" />
                Payment at Delivery (COD)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <ShieldCheck size={17} color="var(--color-soft-beige)" />
                100% Koleksi Buku Asli
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Headphones size={17} color="var(--color-soft-beige)" />
                Layanan Pelanggan Ramah
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sertifikasi BNSP */}
          <div>
            <h4 style={{ color: 'var(--color-warm-cream)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Jam Operasional
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#D3E0D6', lineHeight: '1.6' }}>
              Senin – Jumat: 08.00 – 17.00 WIB Sabtu: 09.00 – 15.00 WIB Minggu & Hari Libur: Tutup.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <strong>SudutBaca</strong> – Online Bookstore. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
