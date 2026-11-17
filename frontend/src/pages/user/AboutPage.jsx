import React from 'react';
import { BookOpen, ShieldCheck, Truck, Target, Award, HeartHandshake } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.825rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <BookOpen size={14} /> Tentang BookSpace
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Membangun Akses Literasi Berkualitas untuk Semua
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            BookSpace hadir sebagai solusi toko buku online modern yang menghubungkan pembaca dengan karya literatur terbaik secara mudah, cepat, dan transparan.
          </p>
        </div>

        {/* Content Section: 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '4rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '1rem' }}>
              Visi & Misi Kami
            </h2>
            <p style={{ color: 'var(--color-slate)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              Kami percaya bahwa buku adalah jembatan pengetahuan yang mampu mengubah masa depan seseorang. BookSpace berdedikasi menyediakan buku-buku berbobot dalam berbagai disiplin ilmu — mulai dari pemrograman, bisnis, pengembangan kepribadian, hingga karya fiksi inspiratif.
            </p>
            <p style={{ color: 'var(--color-slate)', lineHeight: '1.7' }}>
              Dengan antarmuka minimalis dan alur belanja yang ramah pengguna, siapa pun dapat menemukan bahan bacaan yang diinginkan tanpa kerumitan.
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                  <Target size={22} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.25rem' }}>Fokus Kemudahan</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Proses pemesanan yang ringkas, pencarian instan, dan navigasi yang intuitif.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-success-light)', borderRadius: 'var(--radius-md)' }}>
                  <Truck size={22} color="var(--color-success)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.25rem' }}>Payment at Delivery</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Metode pembayaran saat buku sampai di alamat Anda memberikan rasa aman tanpa risiko transaksi digital.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-info-light)', borderRadius: 'var(--radius-md)' }}>
                  <Award size={22} color="var(--color-info)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.25rem' }}>Standar BNSP Junior Web Developer</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Dibangun dengan arsitektur bersih, teruji, dan memenuhi 6 unit kompetensi baku sertifikasi nasional.</p>
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
