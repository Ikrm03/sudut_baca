import React from 'react';
import { BookOpen, ShieldCheck, Truck, Target, Award, Feather, Coffee } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ padding: '3.5rem 0 5.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            backgroundColor: 'var(--color-forest-green-light)',
            color: 'var(--color-forest-green)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem',
            border: '1px solid var(--color-soft-beige)'
          }}>
            <Feather size={14} /> Tentang SudutBaca
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-forest-green)', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Hadirkan Suasana Membaca yang Hangat & Menenangkan
          </h1>
          <p style={{ color: 'var(--color-dark-brown-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
            <strong>SudutBaca</strong> adalah toko buku online dengan filosofi bahwa membaca bukan sekadar aktivitas, melainkan momen bertumbuh yang bernilai. Tagline kami: <em>"Temukan Bacaan Favoritmu."</em>
          </p>
        </div>

        {/* Content Section: 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3.5rem',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '1.25rem' }}>
              Filosofi & Komitmen Kami
            </h2>
            <p style={{ color: 'var(--color-dark-brown)', lineHeight: '1.75', marginBottom: '1.25rem' }}>
              Nama <strong>SudutBaca</strong> terinspirasi dari sudut ternyaman di rumah, perpustakaan, atau kedai kopi — tempat di mana seseorang dapat terhanyut membaca lembar demi lembar dengan tenang dan inspiratif.
            </p>
            <p style={{ color: 'var(--color-dark-brown)', lineHeight: '1.75', marginBottom: '1.25rem' }}>
              Kami berkomitmen menyediakan buku fisik original berkualitas tinggi yang dipilih secara teliti, mulai dari teknologi, bisnis digital, sains, psikologi pengembangan diri, hingga karya sastra fiksi yang memikat.
            </p>
            <p style={{ color: 'var(--color-dark-brown-muted)', lineHeight: '1.75' }}>
              Sistem pembayaran <strong>Payment at Delivery (COD)</strong> kami hadirkan agar siapa pun dapat memesan tanpa rasa cemas, menjamin buku sampai di tangan sebelum pembayaran diselesaikan.
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-soft-beige)',
            padding: '2.25rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
              <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.7rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-md)' }}>
                  <Coffee size={22} color="var(--color-forest-green)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-dark-brown)', marginBottom: '0.25rem' }}>Suasana Hangat & Bersahabat</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-dark-brown-muted)', lineHeight: '1.5' }}>
                    Desain antarmuka warm cream yang tenang di mata, bebas distraksi warna mencolok, dan mudah dinavigasi.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.7rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-md)' }}>
                  <Truck size={22} color="var(--color-forest-green)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-dark-brown)', marginBottom: '0.25rem' }}>Payment at Delivery (COD)</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-dark-brown-muted)', lineHeight: '1.5' }}>
                    Pembayaran tunai di tempat saat buku diterima memberikan rasa aman tanpa risiko transaksi digital.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.7rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-md)' }}>
                  <Award size={22} color="var(--color-forest-green)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-dark-brown)', marginBottom: '0.25rem' }}>Standar BNSP Junior Web Developer</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-dark-brown-muted)', lineHeight: '1.5' }}>
                    Dibangun sesuai 6 unit kompetensi baku dengan arsitektur bersih, teruji, dan terdokumentasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
