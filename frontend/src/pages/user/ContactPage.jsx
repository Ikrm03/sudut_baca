import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ContactPage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Harap isi semua kolom formulir.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.post('/contact', formData);

      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          subject: '',
          message: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(res.data.message || 'Gagal mengirim pesan.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengirim pesan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3.5rem 0 5.5rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-forest-green)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Hubungi Pengelola SudutBaca
          </h1>
          <p style={{ color: 'var(--color-dark-brown-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Punya pertanyaan mengenai ketersediaan buku, konfirmasi alamat pengiriman, atau ingin merekomendasikan judul baru? Kami senang mendengar dari Anda.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Kartu Informasi Layanan */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-soft-beige)',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '1.5rem' }}>
              Informasi Kontak
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-md)' }}>
                  <Mail size={20} color="var(--color-forest-green)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark-brown-muted)' }}>Alamat Email</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-dark-brown)' }}>kontak@sudutbaca.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-md)' }}>
                  <Phone size={20} color="var(--color-forest-green)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark-brown-muted)' }}>WhatsApp Layanan</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-dark-brown)' }}>+62 858-9445-5554</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-forest-green-light)', borderRadius: 'var(--radius-md)' }}>
                  <MapPin size={20} color="var(--color-forest-green)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-dark-brown-muted)' }}>Alamat Toko & Gudang</div>
                  <div style={{ color: 'var(--color-dark-brown)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Jl. Literasi Asri No. 12, Sudut Budaya, Jakarta, Indonesia
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Kirim Pesan */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-soft-beige)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '1.5rem' }}>
              Kirimkan Pesan Anda
            </h3>

            {success && (
              <div style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.925rem',
                border: '1px solid rgba(45, 106, 79, 0.2)'
              }}>
                <CheckCircle2 size={20} color="var(--color-success)" />
                <span>Pesan Anda telah berhasil dikirimkan! Pengelola SudutBaca akan segera merespons.</span>
              </div>
            )}

            {error && (
              <div style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--color-danger-light)',
                color: 'var(--color-danger)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.925rem'
              }}>
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Nama Anda</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nama Lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Alamat Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subjek Pesan</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Contoh: Ketersediaan Buku Pemrograman React"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Isi Pesan</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={5}
                  placeholder="Tuliskan pesan lengkap atau pertanyaan Anda di sini..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Send size={18} />
                {loading ? 'Mengirim Pesan...' : 'Kirim Pesan ke SudutBaca'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
