# DOKUMENTASI LENGKAP BASIS DATA & DAFTAR REST API
# SUDUTBACA – ONLINE BOOKSTORE

Dokumen ini merupakan lampiran teknis terperinci yang menyertai [PANDUAN_MEMAHAMI_PROJECT.md](file:///c:/xampp/htdocs/bookstore/docs/PANDUAN_MEMAHAMI_PROJECT.md). Dokumen ini memuat spesifikasi teknis lengkap dari 8 tabel MySQL dan 28 endpoint REST API yang dibangun pada backend Laravel 10.

---

## 1. STRUKTUR LENGKAP 8 TABEL BASIS DATA (MYSQL)

Nama Basis Data: `bookspace_db`  
Karakter Set: `utf8mb4_unicode_ci`  
Engine: `InnoDB` (Mendukung Foreign Key Constraint & ACID Transaction)

### 1.1 Tabel `users`
Menyimpan akun pengguna, baik berstatus pelanggan umum maupun administrator.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `name` | VARCHAR(255) | No | - | Nama lengkap akun |
| `email` | VARCHAR(255) | No | - | Alamat email (Unique Key) |
| `email_verified_at`| TIMESTAMP | Yes | NULL | Tanggal verifikasi email |
| `password` | VARCHAR(255) | No | - | Kata sandi terenkripsi Bcrypt |
| `role` | ENUM('admin', 'user')| No | 'user' | Hak akses sistem |
| `remember_token` | VARCHAR(100) | Yes | NULL | Token sesi ingat saya |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu akun didaftarkan |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu akun diperbarui |

### 1.2 Tabel `categories`
Menyimpan klasifikasi kategori topik bacaan.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `name` | VARCHAR(100) | No | - | Nama kategori (Unique) |
| `description` | TEXT | Yes | NULL | Deskripsi materi kategori |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu pembuatan |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu pengubahan |

### 1.3 Tabel `books`
Menyimpan katalog seluruh buku yang diperjualbelikan.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `category_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `categories.id` (`ON DELETE CASCADE`) |
| `title` | VARCHAR(255) | No | - | Judul lengkap buku |
| `author` | VARCHAR(255) | No | - | Nama pengarang/penulis |
| `description` | TEXT | No | - | Sinopsis atau rangkuman isi |
| `price` | DECIMAL(12, 2) | No | - | Harga satuan (Rupiah) |
| `stock` | INT UNSIGNED | No | 0 | Jumlah stok fisik tersedia |
| `cover` | VARCHAR(255) | Yes | NULL | Path cover lokal / URL gambar |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu ditambahkan |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu pembaruan data |

### 1.4 Tabel `carts`
Menampung identitas keranjang belanja untuk tiap pengguna aktif.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `user_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `users.id` (Unique, 1-to-1) |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu keranjang dibuat |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu pembaruan |

### 1.5 Tabel `cart_items`
Menyimpan daftar baris buku yang dimasukkan ke dalam keranjang belanja.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `cart_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `carts.id` (`ON DELETE CASCADE`) |
| `book_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `books.id` (`ON DELETE CASCADE`) |
| `quantity` | INT UNSIGNED | No | 1 | Kuantitas buku yang diinginkan |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu item dimasukkan |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu kuantitas diubah |
*Indeks Komposit Unik*: `UNIQUE KEY ('cart_id', 'book_id')`

### 1.6 Tabel `orders`
Master invoice pencatatan transaksi pemesanan buku pelanggan.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `user_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `users.id` (`ON DELETE CASCADE`) |
| `order_number` | VARCHAR(50) | No | - | Nomor invoice unik (Unique Key) |
| `recipient_name`| VARCHAR(255) | No | - | Nama orang penerima buku |
| `phone` | VARCHAR(30) | No | - | Nomor telepon penerima |
| `shipping_address`| TEXT | No | - | Alamat pengiriman kurir |
| `total_price` | DECIMAL(12, 2) | No | - | Total tagihan pesanan |
| `payment_method`| VARCHAR(50) | No | 'Payment at Delivery' | Metode pembayaran (COD) |
| `payment_status`| ENUM('unpaid', 'paid') | No | 'unpaid' | Status pembayaran |
| `order_status` | ENUM('pending', 'processing', 'shipped', 'completed', 'cancelled') | No | 'pending' | Status siklus pesanan |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu pemesanan dibuat |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu status diperbarui |

### 1.7 Tabel `order_items`
Rincian setiap buku yang dibeli di dalam satu nomor pesanan.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `order_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `orders.id` (`ON DELETE CASCADE`) |
| `book_id` | BIGINT UNSIGNED | No | - | Foreign Key $\rightarrow$ `books.id` (`ON DELETE CASCADE`) |
| `quantity` | INT UNSIGNED | No | - | Kuantitas buku yang dibeli |
| `price` | DECIMAL(12, 2) | No | - | Snapshot harga saat transaksi |
| `subtotal` | DECIMAL(12, 2) | No | - | Nilai kalkulasi (Qty $\times$ Price) |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu dicatat |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu pembaruan |

### 1.8 Tabel `contact_messages`
Menyimpan pertanyaan atau pesan dari pengunjung/pelanggan ke admin.

| Nama Kolom | Tipe Data | Nullable | Default | Keterangan |
|---|---|---|---|---|
| `id` | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary Key |
| `user_id` | BIGINT UNSIGNED | Yes | NULL | Foreign Key $\rightarrow$ `users.id` (`ON DELETE SET NULL`) |
| `name` | VARCHAR(255) | No | - | Nama lengkap pengirim |
| `email` | VARCHAR(255) | No | - | Alamat email pengirim |
| `subject` | VARCHAR(255) | No | - | Subjek topik pesan |
| `message` | TEXT | No | - | Isi pesan lengkap |
| `created_at` | TIMESTAMP | Yes | NULL | Waktu pesan dikirimkan |
| `updated_at` | TIMESTAMP | Yes | NULL | Waktu pembaruan |

---

## 2. KATALOG LENGKAP 28 ENDPOINT REST API

Format Standar Respons Sukses:
```json
{
  "success": true,
  "message": "Pesan deskripsi keberhasilan",
  "data": { ... }
}
```

Format Standar Respons Error (Validasi):
```json
{
  "message": "Pesan kegagalan validasi",
  "errors": {
    "field_name": ["Penjelasan spesifik kesalahan"]
  }
}
```

---

### A. Modul Autentikasi (`AuthController`)

#### 1. Registrasi Akun Baru
* **Route**: `POST /api/register`
* **Hak Akses**: Publik
* **Payload Request**:
  ```json
  {
    "name": "Rian Anggara",
    "email": "rian@gmail.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```
* **Respons HTTP 201 (Created)**:
  ```json
  {
    "success": true,
    "message": "Registrasi berhasil!",
    "data": {
      "user": {
        "id": 5,
        "name": "Rian Anggara",
        "email": "rian@gmail.com",
        "role": "user"
      },
      "token": "1|abcdef123456..."
    }
  }
  ```

#### 2. Login Akun
* **Route**: `POST /api/login`
* **Hak Akses**: Publik
* **Payload Request**:
  ```json
  {
    "email": "budi@gmail.com",
    "password": "password123"
  }
  ```
* **Respons HTTP 200 (OK)**:
  ```json
  {
    "success": true,
    "message": "Login berhasil!",
    "data": {
      "user": {
        "id": 2,
        "name": "Budi Pratama",
        "email": "budi@gmail.com",
        "role": "user"
      },
      "token": "2|ghijk789012..."
    }
  }
  ```

#### 3. Ambil Profil Sesi Login
* **Route**: `GET /api/me`
* **Hak Akses**: `auth:sanctum` (Harus menyertakan Header `Authorization: Bearer <token>`)
* **Respons HTTP 200 (OK)**: Mengembalikan objek data pengguna yang sedang login.

#### 4. Logout Sesi
* **Route**: `POST /api/logout`
* **Hak Akses**: `auth:sanctum`
* **Respons HTTP 200 (OK)**: Menghapus token aktif di tabel `personal_access_tokens`.

---

### B. Modul Katalog Buku & Kategori (`BookController` & `CategoryController`)

#### 5. Tampilkan Seluruh Kategori
* **Route**: `GET /api/categories`
* **Hak Akses**: Publik
* **Respons HTTP 200 (OK)**: Menampilkan array seluruh kategori beserta hitungan `books_count`.

#### 6. Detail Kategori Tertentu
* **Route**: `GET /api/categories/{id}`
* **Hak Akses**: Publik

#### 7. Katalog Daftar Buku (Support Search & Filter)
* **Route**: `GET /api/books`
* **Query Parameters**:
  * `search`: Kata kunci pencarian judul atau nama penulis (opsional).
  * `category_id`: ID kategori untuk filter (opsional).
  * `sort`: Pilihan urutan (`newest`, `price_asc`, `price_desc`).
* **Respons HTTP 200 (OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "category_id": 1,
        "title": "Mastering React & Modern JavaScript",
        "author": "Alexandria Rivers",
        "description": "...",
        "price": "125000.00",
        "stock": 20,
        "cover_url": "http://127.0.0.1:8000/storage/books/cover1.jpg",
        "category": { "id": 1, "name": "Teknologi & Pemrograman" }
      }
    ],
    "total": 1
  }
  ```

#### 8. Detail Lengkap 1 Buku
* **Route**: `GET /api/books/{id}`
* **Hak Akses**: Publik
* **Respons HTTP 200 (OK)** / **404 (Not Found)** jika buku tidak ada.

---

### C. Modul Keranjang Belanja (`CartController`)

#### 9. Tampilkan Keranjang User
* **Route**: `GET /api/cart`
* **Hak Akses**: `auth:sanctum` (Customer)
* **Respons HTTP 200 (OK)**:
  ```json
  {
    "success": true,
    "data": {
      "cart_id": 1,
      "items": [ ... ],
      "total_items": 2,
      "total_price": 250000
    }
  }
  ```

#### 10. Tambah Buku ke Keranjang
* **Route**: `POST /api/cart/items`
* **Hak Akses**: `auth:sanctum`
* **Payload Request**: `{ "book_id": 1, "quantity": 2 }`
* **Respons HTTP 201 (Created)**.

#### 11. Ubah Kuantitas Item
* **Route**: `PUT /api/cart/items/{id}`
* **Hak Akses**: `auth:sanctum`
* **Payload Request**: `{ "quantity": 3 }`

#### 12. Hapus Item dari Keranjang
* **Route**: `DELETE /api/cart/items/{id}`
* **Hak Akses**: `auth:sanctum`

---

### D. Modul Transaksi & Pesanan (`OrderController`)

#### 13. Checkout Transaksi (Payment at Delivery)
* **Route**: `POST /api/checkout`
* **Hak Akses**: `auth:sanctum`
* **Payload Request**:
  ```json
  {
    "recipient_name": "Budi Pratama",
    "phone": "081234567890",
    "shipping_address": "Jl. Merdeka No. 45, Jakarta Pusat"
  }
  ```
* **Respons HTTP 201 (Created)**:
  ```json
  {
    "success": true,
    "message": "Pesanan berhasil dibuat! Pembayaran dilakukan saat buku diterima (Payment at Delivery).",
    "data": {
      "id": 1,
      "order_number": "ORD-20261117-ABCDEF",
      "recipient_name": "Budi Pratama",
      "total_price": "250000.00",
      "payment_method": "Payment at Delivery",
      "payment_status": "unpaid",
      "order_status": "pending",
      "items": [ ... ]
    }
  }
  ```

#### 14. Riwayat Pesanan User Sendiri
* **Route**: `GET /api/orders`
* **Hak Akses**: `auth:sanctum`

#### 15. Detail 1 Pesanan
* **Route**: `GET /api/orders/{id}`
* **Hak Akses**: `auth:sanctum` (User hanya dapat melihat miliknya; Admin dapat melihat semua).

---

### E. Modul Administrator (`AdminDashboardController`, `CategoryController`, `BookController`, `OrderController`)

*Seluruh rute di bawah ini diproteksi middleware ganda: `auth:sanctum` dan `role:admin`*.

#### 16. Statistik Dashboard Admin
* **Route**: `GET /api/admin/stats`
* **Respons**: Mengembalikan metrik `total_books`, `total_categories`, `total_users`, `total_orders`, `total_revenue`, `pending_orders`, dan 5 data `recent_orders`.

#### 17. Daftar Pengguna Terdaftar
* **Route**: `GET /api/admin/users`
* **Respons**: Daftar pengguna (id, nama, email, role, tanggal registrasi).

#### 18. Tambah Kategori Baru
* **Route**: `POST /api/admin/categories`
* **Payload**: `{ "name": "Kamus & Ensiklopedia", "description": "..." }`

#### 19. Update Kategori
* **Route**: `PUT /api/admin/categories/{id}`

#### 20. Hapus Kategori
* **Route**: `DELETE /api/admin/categories/{id}`

#### 21. Tambah Buku Baru (+ Upload Cover)
* **Route**: `POST /api/admin/books`
* **Format**: `multipart/form-data`
* **Payload**: `title`, `author`, `category_id`, `price`, `stock`, `description`, `cover` (file binary).

#### 22. Update Data Buku
* **Route**: `POST /api/admin/books/{id}` (Mendukung upload cover pengganti).

#### 23. Hapus Buku dari Katalog
* **Route**: `DELETE /api/admin/books/{id}`

#### 24. Daftar Seluruh Pesanan Toko
* **Route**: `GET /api/admin/orders` (Support filter `?status=pending/shipped/completed`).

#### 25. Ubah Status Pesanan & Pembayaran
* **Route**: `PATCH /api/admin/orders/{id}/status`
* **Payload**:
  ```json
  {
    "order_status": "completed",
    "payment_status": "paid"
  }
  ```

---

### F. Modul Pesan Kontak (`ContactController`)

#### 26. Kirim Pesan Kontak (Customer/Tamu)
* **Route**: `POST /api/contact`
* **Hak Akses**: Publik
* **Payload**: `{ "name": "Tamu", "email": "tamu@mail.com", "subject": "Stok", "message": "..." }`

#### 27. Lihat Semua Pesan Masuk (Admin)
* **Route**: `GET /api/admin/messages`
* **Hak Akses**: `role:admin`

#### 28. Hapus Pesan Masuk (Admin)
* **Route**: `DELETE /api/admin/messages/{id}`
* **Hak Akses**: `role:admin`
