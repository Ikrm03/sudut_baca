import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
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
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Hubungi Admin BookSpace
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Punya pertanyaan mengenai stok buku, konfirmasi pengiriman, atau kendala layanan? Kirimkan pesan Anda kepada tim kami.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Contact Details Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
              Informasi Layanan
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                  <Mail size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Email Layanan</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>support@bookspace.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                  <Phone size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>WhatsApp & Telepon</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>+62 812-3456-7890</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.65rem', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                  <MapPin size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Lokasi Toko</div>
                  <div style={{ color: 'var(--color-dark)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                    Jl. Literasi Mandiri No. 88, Menteng, Jakarta Pusat, Indonesia
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '1.5rem' }}>
              Kirim Pesan Langsung
            </h3>

            {success && (
              <div style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--color-success-light)',
                color: '#065f46',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.925rem'
              }}>
                <CheckCircle2 size={20} color="var(--color-success)" />
                <span>Pesan Anda telah berhasil dikirim! Admin akan segera memeriksa pesan Anda.</span>
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
                  <label className="form-label">Email Anda</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="email@example.com"
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
                  placeholder="Contoh: Menanyakan Ketersediaan Stok Buku React"
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
                {loading ? 'Mengirim Pesan...' : 'Kirim Pesan ke Admin'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
