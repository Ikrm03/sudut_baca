import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
  },
});

// Request Interceptor: Otomatis menyematkan token Bearer jika ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bookspace_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Tangani error global seperti token kadaluarsa (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika unauthenticated dan sebelumnya ada token, bersihkan sesi
      if (localStorage.getItem('bookspace_token')) {
        localStorage.removeItem('bookspace_token');
        localStorage.removeItem('bookspace_user');
      }
    }
    return Promise.reject(error);
  }
);

// Helper format mata uang Rupiah
export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number || 0);
};

// Helper format tanggal Indonesia
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default api;
