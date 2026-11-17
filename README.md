# SudutBaca – Online Bookstore
> **"Temukan Bacaan Favoritmu."**  
> *Aplikasi Toko Buku Online Modern dengan Identitas Visual Warm Green & Cream untuk Uji Kompetensi Sertifikasi BNSP Skema Junior Web Developer*

![SudutBaca Banner](https://images.unsplash.com/photo-1507842229451-7f01be7fe7ab?w=1200&auto=format&fit=crop&q=80)

---

## 🌿 Identitas Visual & Konsep Desain (Warm Green & Cream)

Website **SudutBaca** dirancang dengan konsep *Modern Minimalist, Warm, Natural, dan Elegant* yang menghadirkan suasana membaca yang tenang, ramah di mata, dan profesional:

* **Warm Cream (`#F8F5EC`)**: Latar belakang utama website yang hangat dan nyaman.
* **Forest Green (`#315C46`)**: Warna identitas utama (brand header, tombol primer, sidebar admin, footer).
* **Sage Green (`#789477`)**: Warna sekunder untuk aksen navigasi hover, badge kategori, dan status fokus form.
* **Soft Beige (`#E8DCC5`)**: Warna aksen pendukung dan garis batas (*border*) yang lembut.
* **Dark Brown (`#463D32`)**: Warna tipografi utama yang mudah dibaca dengan kontras seimbang.

---

## 📌 Tentang Aplikasi

**SudutBaca** adalah aplikasi web toko buku online yang dirancang untuk memberikan pengalaman berbelanja buku yang modern, sederhana, dan terpercaya. Aplikasi ini memisahkan arsitektur *frontend* dan *backend* secara terstruktur (*Decoupled Client-Server Architecture*), mengadopsi autentikasi berbasis Bearer Token, dan menggunakan metode transaksi **Payment at Delivery (COD)** sesuai ketentuan Materi Uji Kompetensi (MUK) BNSP Junior Web Developer.

---

## 🚀 Fitur Utama Aplikasi

### A. Fitur Pelanggan (Customer / User)
1. **Beranda & Katalog Interaktif**: Tampilan buku terbaru, pengelompokan kategori pilihan, dan ringkasan keunggulan toko dengan tagline *"Temukan Bacaan Favoritmu."*
2. **Pencarian Buku (Search)**: Pencarian cepat berdasarkan judul buku atau nama penulis terhubung ke backend API.
3. **Detail Informasi Buku**: Informasi buku komprehensif (cover, harga, penulis, kategori, sinopsis, dan indikator ketersediaan stok).
4. **Keranjang Belanja (Shopping Cart)**: Tambah item, ubah kuantitas buku (+ / -), hapus item, dengan kalkulasi subtotal dan total harga belanja real-time.
5. **Checkout & Pembuatan Pesanan**: Pengisian data penerima dan alamat pengiriman dengan perlindungan **Database Transaction (ACID)** sehingga stok buku berkurang secara akurat.
6. **Metode Payment at Delivery (COD)**: Pembayaran tunai dilakukan secara aman saat buku tiba di alamat pembeli tanpa memerlukan payment gateway pihak ketiga.
7. **Riwayat & Detail Pesanan**: Pemantauan status transaksi (*Pending $\rightarrow$ Processing $\rightarrow$ Shipped $\rightarrow$ Completed / Cancelled*) dan nomor unik pesanan.
8. **Hubungi Admin**: Formulir pengiriman pesan langsung ke admin dengan notifikasi feedback visual.
9. **Autentikasi Pengguna**: Registrasi akun baru dengan Bcrypt hashing dan Login dengan Bearer Token Sanctum.

### B. Fitur Administrator
1. **Dashboard Statistik**: Metrik total koleksi buku, total kategori, total pelanggan, total pesanan masuk, dan omset lunas dalam balutan palet Forest Green & Warm Cream.
2. **Kelola Kategori (CRUD)**: Tambah, edit, hapus kategori buku, dan melihat jumlah buku di setiap kategori.
3. **Kelola Buku (CRUD & Upload Cover)**: Tambah buku baru, pengaturan harga/stok, upload file gambar cover, edit data, dan hapus buku.
4. **Kelola Pesanan Pelanggan**: Tinjau seluruh pesanan masuk, rincian buku yang dipesan, serta pembaruan status pesanan dan status pembayaran (*Unpaid $\rightarrow$ Paid*).
5. **Kelola Pengguna**: Meninjau daftar akun pelanggan yang terdaftar di database.
6. **Pesan Masuk**: Membaca dan mengelola pesan kontak yang dikirim oleh pengunjung/pelanggan.

---

## 🛠️ Teknologi yang Digunakan

* **Frontend**: ReactJS (Vite), React Router v6, Axios HTTP Client, Lucide React Icons, Palet Styling Warm Green & Cream.
* **Backend**: PHP 8.2+, Laravel 10 LTS REST API, Laravel Sanctum (Token Auth), Eloquent ORM.
* **Database**: MySQL (MariaDB) dengan 8 tabel ternormalisasi dan foreign keys.
* **Arsitektur**: Decoupled Single Page Application (SPA) + RESTful API.

---

## ⚙️ Panduan Menjalankan Aplikasi

### 1. Server Backend (Laravel)
```bash
cd backend
php artisan serve --port=8000
```
> API aktif berjalan di: `http://127.0.0.1:8000/api`

### 2. Server Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
> Antarmuka website aktif berjalan di: `http://127.0.0.1:5173`

---

## 🔑 Akun Demo Pengujian (Untuk Asesor BNSP)

Untuk mempermudah pengujian saat demonstrasi langsung di hadapan asesor, pada halaman login ([http://127.0.0.1:5173/login](http://127.0.0.1:5173/login)) telah disediakan tombol **Uji Coba Cepat (Akun Demo BNSP)**:

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
│   │   └── index.css              # Warm Green & Cream Styling
│   └── package.json
│
├── documentation/                 # Dokumentasi Khusus Uji Asesmen BNSP
│   ├── DOKUMENTASI_TEKNIS_BNSP.md # Dokumentasi Lengkap, ERD & Alur Logika
│   └── PANDUAN_PRESENTASI_SLIDE.md# Panduan Menyusun 8 Slide Presentasi
│
├── test_e2e_http.js               # Skrip Uji Otomatis Seluruh Alur API
└── README.md                      # Panduan ini
```

---

## 📄 Berkas Dokumentasi Presentasi

* [DOKUMENTASI_TEKNIS_BNSP.md](file:///c:/xampp/htdocs/bookstore/documentation/DOKUMENTASI_TEKNIS_BNSP.md): Berisi latar belakang, kebutuhan fungsional, kamus data, ERD Mermaid, daftar endpoint API, dan potongan kode penting.
* [PANDUAN_PRESENTASI_SLIDE.md](file:///c:/xampp/htdocs/bookstore/documentation/PANDUAN_PRESENTASI_SLIDE.md): Berisi panduan terperinci menyusun 8 slide presentasi serta daftar 10 titik screenshot yang disarankan.

---
*Didedikasikan untuk memenuhi standar Asesmen Sertifikasi BNSP Junior Web Developer.*
