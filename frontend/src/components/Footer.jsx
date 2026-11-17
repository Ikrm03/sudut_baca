import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Truck, Headphones } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Kolom 1: Profil Toko */}
          <div>
            <div className="brand-logo" style={{ color: '#fff', marginBottom: '1rem' }}>
              <div className="brand-icon">
                <BookOpen size={20} />
              </div>
              <span>BookSpace</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#94a3b8', maxWidth: '320px' }}>
              Platform toko buku online modern yang menghadirkan literatur berkualitas, proses belanja mudah, dan jaminan pengiriman aman dengan metode <strong>Payment at Delivery</strong>.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Navigasi Cepat
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><Link to="/" style={{ color: '#94a3b8' }}>Beranda</Link></li>
              <li><Link to="/books" style={{ color: '#94a3b8' }}>Katalog Buku</Link></li>
              <li><Link to="/about" style={{ color: '#94a3b8' }}>Tentang BookSpace</Link></li>
              <li><Link to="/contact" style={{ color: '#94a3b8' }}>Hubungi Admin</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan & Keunggulan */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Layanan Toko
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="var(--color-primary)" />
                Payment at Delivery (COD)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--color-success)" />
                Buku Original & Berkualitas
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Headphones size={16} color="var(--color-info)" />
                Dukungan Pelanggan
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sertifikasi BNSP */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Sertifikasi
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
              Proyek ini dibangun untuk memenuhi persyaratan <strong>Materi Uji Kompetensi (MUK) BNSP Junior Web Developer</strong>.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BookSpace – Online Bookstore. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
