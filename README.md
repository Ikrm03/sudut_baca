# BookSpace – Online Bookstore
> **Aplikasi Toko Buku Online Modern untuk Uji Kompetensi Sertifikasi BNSP Skema Junior Web Developer**

![BookSpace Banner](https://images.unsplash.com/photo-1507842229451-7f01be7fe7ab?w=1200&auto=format&fit=crop&q=80)

---

## 📌 Tentang Aplikasi

**BookSpace** adalah aplikasi web toko buku online yang dirancang untuk memberikan pengalaman berbelanja buku yang modern, sederhana, dan terpercaya. Aplikasi ini memisahkan arsitektur *frontend* dan *backend* secara terstruktur (*Decoupled Client-Server Architecture*), mengadopsi autentikasi berbasis Bearer Token, dan menggunakan metode transaksi **Payment at Delivery (COD)** sesuai ketentuan Materi Uji Kompetensi (MUK) BNSP Junior Web Developer.

---

## 🚀 Fitur Utama Aplikasi

### A. Fitur Pelanggan (Customer / User)
1. **Beranda & Katalog Interaktif**: Tampilan buku terbaru, pengelompokan kategori pilihan, dan ringkasan keunggulan toko.
2. **Pencarian Buku (Search)**: Pencarian cepat berdasarkan judul buku atau nama penulis terhubung ke backend API.
3. **Detail Informasi Buku**: Informasi buku komprehensif (cover, harga, penulis, kategori, sinopsis, dan indikator ketersediaan stok).
4. **Keranjang Belanja (Shopping Cart)**: Tambah item, ubah kuantitas buku (+ / -), hapus item, dengan kalkulasi subtotal dan total harga belanja real-time.
5. **Checkout & Pembuatan Pesanan**: Pengisian data penerima dan alamat pengiriman dengan perlindungan **Database Transaction (ACID)** sehingga stok buku berkurang secara akurat.
6. **Metode Payment at Delivery (COD)**: Pembayaran tunai dilakukan secara aman saat buku tiba di alamat pembeli tanpa memerlukan payment gateway pihak ketiga.
7. **Riwayat & Detail Pesanan**: Pemantauan status transaksi (*Pending $\rightarrow$ Processing $\rightarrow$ Shipped $\rightarrow$ Completed / Cancelled*) dan nomor unik pesanan.
8. **Hubungi Admin**: Formulir pengiriman pesan langsung ke admin dengan notifikasi feedback visual.
9. **Autentikasi Pengguna**: Registrasi akun baru dengan Bcrypt hashing dan Login dengan Bearer Token Sanctum.

### B. Fitur Administrator
1. **Dashboard Statistik**: Metrik total koleksi buku, total kategori, total pelanggan, total pesanan masuk, dan omset lunas.
2. **Kelola Kategori (CRUD)**: Tambah, edit, hapus kategori buku, dan melihat jumlah buku di setiap kategori.
3. **Kelola Buku (CRUD & Upload Cover)**: Tambah buku baru, pengaturan harga/stok, upload file gambar cover, edit data, dan hapus buku.
4. **Kelola Pesanan Pelanggan**: Tinjau seluruh pesanan masuk, rincian buku yang dipesan, serta pembaruan status pesanan dan status pembayaran (*Unpaid $\rightarrow$ Paid*).
5. **Kelola Pengguna**: Meninjau daftar akun pelanggan yang terdaftar di database.
6. **Pesan Masuk**: Membaca dan mengelola pesan kontak yang dikirim oleh pengunjung/pelanggan.

---

## 🛠️ Teknologi yang Digunakan

* **Frontend**: ReactJS (Vite), React Router v6, Axios HTTP Client, Lucide React Icons, Modern Minimalist CSS.
* **Backend**: PHP 8.2+, Laravel 10 LTS REST API, Laravel Sanctum (Token Auth), Eloquent ORM.
* **Database**: MySQL (MariaDB) dengan 8 tabel ternormalisasi dan foreign keys.
* **Arsitektur**: Decoupled Single Page Application (SPA) + RESTful API.

---

## 📋 Prasyarat Lingkungan (Prerequisites)

Pastikan komputer telah terpasang:
1. **PHP**: Versi `8.2` atau lebih baru
2. **Composer**: Versi `2.x`
3. **Node.js**: Versi `18.x` atau lebih baru (npm `9.x`+)
4. **MySQL / XAMPP**: Layanan MySQL aktif berjalan di port `3306`

---

## ⚙️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Konfigurasi Backend (Laravel)

Buka terminal dan arahkan ke folder `backend`:
```bash
cd backend
```

Salin file environment (jika belum ada) dan sesuaikan koneksi database MySQL:
```bash
cp .env.example .env
```
Pastikan pengaturan `.env` sesuai dengan database MySQL Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bookspace_db
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi tabel dan pengisian data awal (*seeder*):
```bash
php artisan migrate:fresh --seed
```

Hubungkan storage link untuk melayani upload cover buku:
```bash
php artisan storage:link
```

Jalankan server backend Laravel:
```bash
php artisan serve --port=8000
```
> Backend API kini berjalan aktif di: `http://127.0.0.1:8000`

---

### 2. Konfigurasi Frontend (React + Vite)

Buka terminal baru dan arahkan ke folder `frontend`:
```bash
cd frontend
```

Instal dependensi:
```bash
npm install
```

Jalankan server pengembangan Vite:
```bash
npm run dev
```
> Frontend kini berjalan aktif di: `http://127.0.0.1:5173`

---

## 🔑 Akun Demo Pengujian (Untuk Asesor BNSP)

Untuk mempermudah pengujian saat demonstrasi langsung di hadapan asesor, Anda dapat menggunakan akun yang sudah di-seed berikut atau menggunakan tombol **Demo Akun Cepat** di halaman `/login`:

| Peran (Role) | Alamat Email | Kata Sandi | Hak Akses Fitur |
|---|---|---|---|
| **Administrator** | `admin@bookspace.com` | `password123` | Akses penuh dashboard admin, kelola kategori, buku, pesanan, user, dan pesan. |
| **Customer** | `budi@gmail.com` | `password123` | Eksplorasi katalog, keranjang belanja, checkout COD, riwayat pesanan, kontak admin. |

---

## 📁 Struktur Direktori Proyek

```
bookstore/
│
├── backend/                       # Source Code Laravel 10 REST API
│   ├── app/
│   │   ├── Http/Controllers/      # Logic Controller Modular
│   │   ├── Http/Middleware/       # CheckRole Middleware
│   │   └── Models/                # Eloquent Models (8 Entitas)
│   ├── database/migrations/       # 8 Migration Files
│   ├── database/seeders/          # Database Seeders
│   └── routes/api.php             # 28 REST API Endpoints
│
├── frontend/                      # Source Code ReactJS + Vite SPA
│   ├── src/
│   │   ├── components/            # Reusable UI Components
│   │   ├── context/               # AuthContext & CartContext
│   │   ├── layouts/               # MainLayout & AdminLayout
│   │   ├── pages/user/            # 7 Halaman Customer & Tamu
│   │   ├── pages/admin/           # 6 Halaman Dashboard Admin
│   │   ├── routes/                # Routing & ProtectedRoute Guards
│   │   ├── services/api.js        # Axios Client Configuration
│   │   └── index.css              # Modern Minimalist Bookstore Styling
│   └── package.json
│
├── documentation/                 # Dokumentasi Khusus Uji Asesmen BNSP
│   ├── DOKUMENTASI_TEKNIS_BNSP.md # Dokumentasi Lengkap & ERD
│   └── PANDUAN_PRESENTASI_SLIDE.md# Panduan Menyusun 8 Slide Presentasi
│
├── test_e2e_http.js               # Skrip Uji Otomatis Seluruh Alur API
└── README.md                      # Panduan ini
```

---

## 📄 Berkas Dokumentasi Presentasi

Silakan buka folder `documentation/` untuk membaca referensi penyusunan materi presentasi:
* [DOKUMENTASI_TEKNIS_BNSP.md](file:///c:/xampp/htdocs/bookstore/documentation/DOKUMENTASI_TEKNIS_BNSP.md): Berisi latar belakang, kebutuhan fungsional, kamus data, ERD Mermaid, daftar endpoint API, dan potongan kode penting.
* [PANDUAN_PRESENTASI_SLIDE.md](file:///c:/xampp/htdocs/bookstore/documentation/PANDUAN_PRESENTASI_SLIDE.md): Berisi panduan terperinci menyusun 8 slide presentasi serta daftar 10 titik screenshot yang disarankan.

---
*Dibuat dengan dedikasi untuk memenuhi standar Asesmen Sertifikasi BNSP Junior Web Developer.*
