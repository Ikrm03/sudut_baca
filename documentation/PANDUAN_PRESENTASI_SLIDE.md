# PANDUAN PENYUSUNAN SLIDE PRESENTASI ASESMEN BNSP
## Project: SudutBaca – Online Bookstore (Junior Web Developer)
> **Tagline**: "Temukan Bacaan Favoritmu." | **Palet**: Warm Green & Cream (#315C46 & #F8F5EC)

Dokumen ini disusun sebagai panduan dan bahan referensi bagi Anda untuk membuat slide presentasi sendiri (misalnya menggunakan PowerPoint, Canva, atau Google Slides) sesuai 8 materi presentasi yang dipersyaratkan oleh Asesor BNSP.

---

### SLIDE 1: JUDUL PROYEK
* **Judul Utama**: Pengembangan Aplikasi Toko Buku Online "SudutBaca"
* **Tagline**: "Temukan Bacaan Favoritmu."
* **Konsep Desain**: Modern Minimalist, Warm, Natural & Elegant (Warm Green & Cream)
* **Sub-Judul**: Memenuhi Persyaratan Materi Uji Kompetensi (MUK) Skema Junior Web Developer - BNSP
* **Nama Asesi / Peserta**: [Nama Lengkap Anda]
* **No. Registrasi / NIK**: [Nomor Anda]
* **Teknologi**: ReactJS (Vite) + PHP (Laravel 10 REST API) + MySQL

---

### SLIDE 2: PENGANTAR DAN RUANG LINGKUP PROYEK
* **Latar Belakang**:
  - Keterbatasan toko buku fisik dalam menjangkau pembaca yang menginginkan katalog lengkap, cepat, dan transparan.
  - Banyak pelanggan yang enggan menggunakan dompet digital/kartu perbankan karena masalah privasi dan risiko penipuan.
* **Tujuan Aplikasi**:
  - Menyediakan toko buku online modern dengan pemisahan frontend dan backend yang terstruktur.
  - Menerapkan metode transaksi aman **Payment at Delivery (COD)** di mana pelanggan hanya membayar tunai saat pesanan telah tiba di tangan.
* **Batasan Masalah**:
  - Transaksi eksklusif menggunakan metode Payment at Delivery (tanpa payment gateway eksternal).
  - Dua hak akses pengguna: Administrator dan Customer.
* **Kebutuhan Fungsional**:
  - *Customer*: Katalog, Detail Buku, Pencarian, Keranjang, Checkout COD, Riwayat Pesanan, Form Kontak.
  - *Admin*: Dashboard Statistik, CRUD Kategori, CRUD Buku (+ Upload Cover), Kelola Pesanan (Update Status), Monitoring User, Tinjau Pesan.

---

### SLIDE 3: DESAIN DATABASE & ERD
* **Poin Penjelasan**:
  - Menggunakan MySQL dengan 8 tabel ternormalisasi: `users`, `categories`, `books`, `carts`, `cart_items`, `orders`, `order_items`, `contact_messages`.
  - Menggunakan tipe data `DECIMAL(12,2)` untuk harga dan subtotal guna mencegah floating-point rounding error.
  - Relasi antar tabel dijaga dengan integritas Foreign Key (`cascade` dan `restrict`).
* **Visualisasi ERD**:
  - Tampilkan diagram relasi entitas (diagram ERD Mermaid dari dokumen teknis).

---

### SLIDE 4: STRUKTUR FOLDER DAN MANAJEMEN KODE
* **Pemisahan Direktori**:
  - `frontend/`: ReactJS + Vite (Components, Context, Layouts, Pages, Routes, Services).
  - `backend/`: Laravel 10 (Controllers, Models, Middleware, Migrations, Seeders, API Routes).
* **Prinsip Clean Architecture**:
  - *Separation of Concerns*: Routing terpisah, autentikasi berbasis Sanctum Token, Axios Interceptors, serta pengelompokan Controller modular.
* **Link Repository GitHub**:
  - Cantumkan tautan repository GitHub proyek Anda di slide ini.

---

### SLIDE 5: DOKUMENTASI UI/UX (SCREENSHOT GUIDE)
Ambil screenshot pada browser Anda di lokasi-lokasi berikut untuk ditempel pada slide ini:
1. **Screenshot 1**: Halaman Beranda (`/`) — Menampilkan Hero Section, Kategori Pilihan, dan Grid Buku.
2. **Screenshot 2**: Halaman Katalog & Pencarian (`/books`) — Menampilkan fitur pencarian judul dan filter dropdown kategori.
3. **Screenshot 3**: Detail Buku (`/books/1`) — Menampilkan cover buku, harga, stok, dan tombol kuantitas.
4. **Screenshot 4**: Keranjang Belanja (`/cart`) — Menampilkan daftar item, kontrol (+ / -), dan kalkulasi otomatis total belanja.
5. **Screenshot 5**: Formulir Checkout COD (`/checkout`) — Menampilkan isian alamat dan metode Payment at Delivery yang terkunci.
6. **Screenshot 6**: Detail Pesanan Sukses (`/orders/:id`) — Menampilkan nomor pesanan, status pesanan, dan status pembayaran.
7. **Screenshot 7**: Halaman Login & Demo Akun (`/login`) — Menampilkan tombol satu-klik Akun Admin dan Akun Customer.
8. **Screenshot 8**: Dashboard Admin (`/admin/dashboard`) — Menampilkan 4 kartu statistik dan tabel 5 pesanan terbaru.
9. **Screenshot 9**: Kelola Buku Admin (`/admin/books`) — Menampilkan tabel buku beserta aksi Edit/Hapus dan modal tambah buku.
10. **Screenshot 10**: Kelola Pesanan Admin (`/admin/orders`) — Menampilkan modal pembaruan status pesanan (*Pending $\rightarrow$ Completed*).

---

### SLIDE 6: ALUR LOGIKA & POTONGAN KODE PENTING
Pilih 2 fitur utama ini untuk dipresentasikan:
1. **Database Transaction saat Checkout (`OrderController@checkout`)**:
   - Jelaskan penggunaan `DB::beginTransaction()` untuk menjamin sifat ACID.
   - Pengecekan ketersediaan stok buku secara real-time sebelum order disimpan.
   - Pengurangan stok otomatis (`decrement`) dan pemindahan item keranjang ke `order_items`.
   - Rollback otomatis jika terjadi kegagalan data.
2. **Middleware Otentikasi & Otorisasi Peran (`CheckRole.php`)**:
   - Jelaskan bahwa endpoint `/api/admin/*` diproteksi middleware ganda: `auth:sanctum` (memastikan pengguna login) dan `role:admin` (memastikan hanya admin yang boleh mengelola data toko).

---

### SLIDE 7: SKENARIO DEMONSTRASI LANGSUNG (LIVE DEMO)
Tuliskan urutan aksi yang akan Anda demokan secara percaya diri di depan penguji:
1. Menunjukkan website Beranda dan melakukan pencarian buku dengan kata kunci "React".
2. Login sebagai Customer (Budi) melalui tombol demo cepat.
3. Memilih buku, menambahkan 2 pcs ke keranjang belanja.
4. Membuka keranjang, memperbarui kuantitas, lalu melanjutkan ke checkout.
5. Mengisi alamat pengiriman, mengonfirmasi pesanan dengan metode **Payment at Delivery**.
6. Menunjukkan nomor pesanan terbit dan status awal pesanan adalah **Pending (Unpaid)**.
7. Logout dan login kembali sebagai **Admin**.
8. Menunjukkan perubahan statistik di Dashboard.
9. Membuka Kelola Pesanan, mengubah status pesanan Budi menjadi **Completed**, dan menunjukkan status pembayaran otomatis menjadi **Paid (Lunas)**.

---

### SLIDE 8: KESIMPULAN & PENGEMBANGAN LANJUTAN
* **Kesimpulan**:
  - Aplikasi BookSpace berhasil memenuhi seluruh spesifikasi fungsional dan teknis yang dipersyaratkan oleh Materi Uji Kompetensi (MUK) BNSP Junior Web Developer.
  - Memenuhi 6 Unit Kompetensi (UI, Pemrograman Teks/Grafik/Multimedia, Manajemen Berkas, Guidelines & Best Practices, Pemrograman Terstruktur, serta Pemanfaatan Library).
  - Alur bisnis Payment at Delivery berjalan tanpa kegagalan data berkat penerapan Database Transaction.
* **Rencana Pengembangan Lanjutan (Future Work)**:
  - Integrasi notifikasi status pengiriman pesanan melalui WhatsApp API / SMS Gateway.
  - Penambahan fitur ulasan dan rating buku oleh pembeli yang terverifikasi.
  - Fitur ekspor laporan penjualan bulanan ke dalam format PDF dan Excel bagi manajemen toko.
