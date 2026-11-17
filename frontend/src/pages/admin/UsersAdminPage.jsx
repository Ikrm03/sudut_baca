import React, { useState, useEffect } from 'react';
import { Users, Shield, User as UserIcon, Calendar, Mail } from 'lucide-react';
import api, { formatDate } from '../../services/api';

const UsersAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/users');
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin users list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
          Daftar Pengguna Terdaftar
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
          Informasi akun pelanggan dan administrator yang terdaftar di sistem SudutBaca
        </p>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th>Nama Pengguna</th>
              <th>Alamat Email</th>
              <th style={{ textAlign: 'center' }}>Peran (Role)</th>
              <th>Tanggal Registrasi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Memuat data pengguna...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((u) => {
                const isAdmin = u.role === 'admin';
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600, color: 'var(--color-muted)' }}>#{u.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: isAdmin ? 'var(--color-primary-light)' : 'var(--color-bg-subtle)',
                          color: isAdmin ? 'var(--color-primary)' : 'var(--color-slate)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}>
                          {u.name ? u.name[0].toUpperCase() : 'U'}
                        </div>
                        <strong style={{ color: 'var(--color-dark)' }}>{u.name}</strong>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-muted)' }}>
                        <Mail size={14} />
                        <span>{u.email}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: isAdmin ? 'var(--color-primary-light)' : '#f1f5f9',
                        color: isAdmin ? 'var(--color-primary)' : 'var(--color-slate)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        {isAdmin ? <Shield size={12} /> : <UserIcon size={12} />}
                        {isAdmin ? 'Administrator' : 'Customer'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={14} />
                        {formatDate(u.created_at)}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
                  Belum ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdminPage;
