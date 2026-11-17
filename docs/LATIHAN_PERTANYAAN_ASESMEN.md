# PANDUAN POCKET & LATIHAN TANYA JAWAB ASESMEN BNSP
# SUDUTBACA – ONLINE BOOKSTORE
### 35 Pertanyaan & Kunci Jawaban Wawancara Skema Junior Web Developer

> **Tujuan Dokumen**: Berisi daftar pertanyaan yang paling sering diajukan oleh Asesor Uji Kompetensi BNSP beserta panduan jawaban praktis, to-the-point, dan berbasis kode nyata project **SudutBaca**.

---

## KELOMPOK 1: PERTANYAAN UMUM PROYEK

### Q1: Apa latar belakang dan tujuan Anda membangun website SudutBaca?
* **Jawaban Ideal**:  
  *"SudutBaca dibangun untuk mempermudah pembaca menemukan buku fisik berkualitas dengan pengalaman belanja yang nyaman dan hangat. Sesuai ketentuan Materi Uji Kompetensi (MUK) BNSP, aplikasi ini mengadopsi metode transaksi **Payment at Delivery (COD)**, di mana pembeli membayar secara tunai saat buku tiba di tangan kurir sehingga aman dan bebas dari risiko transaksi digital."*

### Q2: Mengapa Anda memisahkan folder frontend dan backend (Decoupled Architecture)?
* **Jawaban Ideal**:  
  *"Pemisahan ini menerapkan prinsip **Separation of Concerns**. Frontend (React + Vite) hanya bertanggung jawab terhadap tampilan antarmuka dan pengalaman pengguna, sedangkan Backend (Laravel 10) bertanggung jawab atas keamanan data, validasi, dan logika bisnis. Keunggulannya: sistem lebih terstruktur, mudah diuji secara independen, dan jika suatu saat kita ingin membuat aplikasi mobile (Android/iOS), backend API yang sama dapat langsung digunakan kembali."*

### Q3: Berapa hak akses (role) pengguna pada sistem ini dan bagaimana perbedaannya?
* **Jawaban Ideal**:  
  *"Ada 2 role, yaitu **Admin** dan **User (Customer)**. User dapat menjelajahi katalog, mencari buku, menambah ke keranjang belanja, melakukan checkout COD, memantau riwayat pesanan, dan mengirim pesan kontak. Sedangkan Admin memiliki hak akses khusus untuk mengelola master kategori, menambah/mengedit buku dan upload cover gambar, memantau data pengguna, serta memperbarui status pengiriman dan pembayaran pesanan."*

---

## KELOMPOK 2: PERTANYAAN FRONTEND (REACTJS & VITE)

### Q4: Mengapa Anda menggunakan Vite daripada Create React App (CRA)?
* **Jawaban Ideal**:  
  *"Vite menggunakan modul ES bawaan browser (*native ES modules*) dan bundler Rollup, sehingga proses startup server lokal jauh lebih cepat (hitungan milidetik) dan fitur Hot Module Replacement (HMR)-nya instan saat kita mengubah kode program."*

### Q5: Apa itu konsep Single Page Application (SPA)?
* **Jawaban Ideal**:  
  *"SPA adalah aplikasi web yang hanya memuat satu file HTML (`index.html`) di awal. Saat pengguna berpindah halaman (misalnya dari Beranda ke Keranjang), peramban tidak meminta halaman HTML baru dari server, melainkan React Router yang secara dinamis mengganti komponen yang tampil di layar. Hasilnya navigasi terasa sangat cepat seperti aplikasi desktop."*

### Q6: Bagaimana Anda mengelola data yang perlu diakses oleh banyak halaman (State Management)?
* **Jawaban Ideal**:  
  *"Saya menggunakan **React Context API**, yaitu `AuthContext` untuk membagikan data status login pengguna dan token sesi, serta `CartContext` untuk membagikan data jumlah item keranjang belanja ke seluruh komponen navbar dan halaman."*

### Q7: Bagaimana cara kerja proteksi rute di frontend (`ProtectedRoute`)?
* **Jawaban Ideal**:  
  *"Komponen `ProtectedRoute` memeriksa state autentikasi dari `AuthContext`. Jika pengguna mencoba mengakses rute admin `/admin/*` namun rolenya bukan admin, sistem langsung mengalihkannya (*redirect*) ke halaman beranda (`/`). Begitu juga jika user belum login dan ingin membuka keranjang belanja, rute otomatis mengarahkannya ke `/login`."*

---

## KELOMPOK 3: PERTANYAAN BACKEND (PHP LARAVEL)

### Q8: Mengapa memilih Laravel 10 untuk backend API?
* **Jawaban Ideal**:  
  *"Laravel 10 memiliki struktur folder klasik yang rapi dan modular, ekosistem keamanan yang matang (*Bcrypt, CSRF protection, SQL Injection protection*), serta ORM Eloquent yang mempermudah relasi basis data tanpa query rumit."*

### Q9: Di mana Anda meletakkan logika otorisasi peran Admin?
* **Jawaban Ideal**:  
  *"Di dalam berkas middleware custom `app/Http/Middleware/CheckRole.php`. Middleware ini memeriksa `$request->user()->role`. Jika nilai rolenya tidak cocok dengan parameter rute, server langsung menghentikan request dan mengirimkan status HTTP 403 Unauthorized."*

### Q10: Bagaimana alur unggah gambar cover buku di sisi server?
* **Jawaban Ideal**:  
  *"Saat form admin mengirimkan berkas gambar via multipart/form-data, `BookController@store` memvalidasi tipe file (`jpeg,png,jpg,webp`) dan ukuran maksimal 2MB. File disimpan ke storage disk publik di folder `storage/app/public/books/`, lalu path filenya disimpan ke kolom `cover` di database. Agar bisa diakses publik lewat URL peramban, dibuat symlink menggunakan perintah `php artisan storage:link`."*

---

## KELOMPOK 4: PERTANYAAN BASIS DATA MYSQL

### Q11: Berapa tabel yang ada di database dan sebutkan relasi utamanya?
* **Jawaban Ideal**:  
  *"Terdapat 8 tabel: `users`, `categories`, `books`, `carts`, `cart_items`, `orders`, `order_items`, dan `contact_messages`. Relasinya meliputi:
  * Kategori ke Buku: One-to-Many (`categories` 1 $\rightarrow$ N `books`).
  * User ke Keranjang: One-to-One (`users` 1 $\rightarrow$ 1 `carts`).
  * Keranjang ke Item: One-to-Many (`carts` 1 $\rightarrow$ N `cart_items`).
  * User ke Pesanan: One-to-Many (`users` 1 $\rightarrow$ N `orders`).
  * Pesanan ke Detail Buku: One-to-Many (`orders` 1 $\rightarrow$ N `order_items`)."*

### Q12: Mengapa harga menggunakan tipe data `DECIMAL(12,2)` bukan `FLOAT` atau `INTEGER`?
* **Jawaban Ideal**:  
  *"Tipe data `FLOAT` bersifat perkiraan (*approximate value*) dan rawan mengalami kesalahan pembulatan angka desimal (*floating-point rounding error*). Sedangkan `DECIMAL` menyimpan angka secara presisi dan eksak sehingga merupakan standar baku industri untuk transaksi keuangan dan e-commerce."*

### Q13: Apa itu Foreign Key dan apa aturan `ON DELETE CASCADE` yang Anda terapkan?
* **Jawaban Ideal**:  
  *"Foreign Key adalah kolom pengunci relasi yang merujuk pada Primary Key tabel induk. Aturan `ON DELETE CASCADE` (misalnya pada `cart_items` dan `order_items`) memastikan jika sebuah keranjang atau pesanan induk dihapus, seluruh baris detail itemnya otomatis ikut terhapus agar tidak meninggalkan data sampah (*orphaned records*)."*

---

## KELOMPOK 5: PERTANYAAN KOMUNIKASI REST API

### Q14: Bagaimana cara frontend mengirim token login ke backend?
* **Jawaban Ideal**:  
  *"Melalui library **Axios** yang dikonfigurasikan dengan *Request Interceptor* pada file `frontend/src/services/api.js`. Interceptor otomatis membaca token dari `localStorage` dan menyematkannya ke header HTTP: `Authorization: Bearer <token>` pada setiap panggilan API yang membutuhkan autentikasi."*

### Q15: Apa format respons standar yang Anda gunakan?
* **Jawaban Ideal**:  
  *"Format JSON konsisten dengan 3 properti utama:
  `{ "success": true/false, "message": "Penjelasan operasi", "data": { ... } }`
  Dengan struktur ini, frontend dapat dengan mudah mengecek kondisi `if (res.data.success)` untuk memberikan umpan balik kepada pengguna."*

### Q16: Apa itu CORS dan bagaimana Anda menanganinya?
* **Jawaban Ideal**:  
  *"CORS (*Cross-Origin Resource Sharing*) adalah mekanisme keamanan peramban yang memblokir permintaan data jika domain/port asal klien berbeda dengan server (port 5173 vs port 8000). Saya mengaturnya di file backend `config/cors.php` dengan menyetel `allowed_origins => ['*']` dan jalur `paths => ['api/*']`."*

---

## KELOMPOK 6: PERTANYAAN LOGIKA PEMROGRAMAN & TRANSAKSI

### Q17: Mengapa proses Checkout harus menggunakan `DB::beginTransaction()`?
* **Jawaban Ideal**:  
  *"Untuk menjamin prinsip keandalan **ACID (Atomicity, Consistency, Isolation, Durability)**. Dalam checkout ada 4 langkah: validasi stok, insert master pesanan, insert rincian buku & kurangi stok fisik, lalu kosongkan keranjang belanja. Jika langkah ke-3 gagal karena listrik padam atau gangguan server, perintah `DB::rollBack()` akan membatalkan seluruh perubahan. Stok buku tidak akan berkurang salah dan data tidak tersimpan setengah-setengah."*

### Q18: Bagaimana jika pelanggan nakal mengubah harga buku dari Inspect Element browser saat checkout?
* **Jawaban Ideal**:  
  *"Manipulasi tersebut tidak akan berdampak karena backend tidak pernah mempercayai nilai harga yang dikirim dari klien. Controller `OrderController@checkout` mengambil langsung harga asli dari basis data MySQL berdasarkan `book_id` dan menghitung ulang total belanja di sisi server."*

### Q19: Apa yang terjadi pada stok buku jika admin membatalkan pesanan (`cancelled`)?
* **Jawaban Ideal**:  
  *"Di dalam `OrderController@updateStatus`, sistem mengecek status pesanan. Jika status diubah menjadi `cancelled`, sistem secara otomatis mengembalikan stok buku ke tabel `books` menggunakan method `increment('stock', $item->quantity)`."*

---

## KELOMPOK 7: PERTANYAAN KEAMANAN APLIKASI

### Q20: Bagaimana cara Anda menyimpan kata sandi pengguna?
* **Jawaban Ideal**:  
  *"Kata sandi pengguna di-hash secara satu arah menggunakan algoritma Bcrypt via fungsi bawaan Laravel `Hash::make()`. Kata sandi tidak pernah disimpan dalam teks biasa dan verifikasi login dilakukan menggunakan fungsi `Hash::check()`."*

### Q21: Bagaimana sistem mencegah serangan SQL Injection?
* **Jawaban Ideal**:  
  *"Dengan menggunakan Laravel Eloquent ORM. Eloquent secara otomatis menggunakan PDO Parameter Binding di mana input data dari pengguna diperlakukan murni sebagai parameter data, bukan sebagai perintah query SQL yang bisa dieksekusi."*

### Q22: Apa status kode HTTP yang Anda gunakan saat validasi formulir gagal?
* **Jawaban Ideal**:  
  *"Status HTTP **422 Unprocessable Entity**. Server akan mengembalikan rincian kolom apa saja yang salah diisi beserta pesan error dalam bahasa Indonesia."*

---

## KELOMPOK 8: PERTANYAAN IMPLEMENTASI 6 UNIT BNSP

### Q23: Tunjukkan bukti Anda mengimplementasikan Unit J.620100.005.02 (User Interface)?
* **Jawaban Ideal**:  
  *"Buktinya terdapat pada antarmuka SudutBaca di `frontend/src/pages/user/` dan `components/`. Seluruh komponen menggunakan styling responsif, kartu buku yang proporsional, palet warna elegan Warm Green & Cream, serta navigasi yang ramah pengguna."*

### Q24: Tunjukkan bukti Anda mengimplementasikan Unit J.620100.010.01 (Multimedia & Grafik)?
* **Jawaban Ideal**:  
  *"Buktinya adalah pengelolaan berkas cover gambar buku pada `BookController@store`. Sistem menangani upload file binary gambar, memvalidasi MIME-type gambar, menyimpannya di storage lokal server, dan menampilkannya kembali pada kartu buku dan tabel admin."*

### Q25: Tunjukkan bukti Anda mengimplementasikan Unit J.620100.015.01 (Organisasi File)?
* **Jawaban Ideal**:  
  *"Buktinya adalah arsitektur direktori proyek yang rapi: pemisahan direktori `backend/` dan `frontend/`, penataan Controller, Model, Migration, Routes, dan komponen React yang terpisah sesuai fungsinya (*Separation of Concerns*)."*

### Q26: Tunjukkan bukti Anda mengimplementasikan Unit J.620100.016.01 (Guidelines & Best Practices)?
* **Jawaban Ideal**:  
  *"Buktinya adalah validasi input Form Request ketat, hashing kata sandi Bcrypt, penamaan variabel yang deskriptif dan konsisten, serta penggunaan kode respons HTTP RESTful standar (200, 201, 401, 403, 404, 422)."*

### Q27: Tunjukkan bukti Anda mengimplementasikan Unit J.620100.017.02 (Pemrograman Terstruktur)?
* **Jawaban Ideal**:  
  *"Buktinya adalah alur eksekusi logika yang teratur: Request masuk $\rightarrow$ disaring Middleware $\rightarrow$ diterima Controller $\rightarrow$ divalidasi $\rightarrow$ diproses oleh Model/Eloquent $\rightarrow$ dibungkus Database Transaction $\rightarrow$ dikembalikan sebagai JSON."*

### Q28: Tunjukkan bukti Anda mengimplementasikan Unit J.620100.019.02 (Penggunaan Library)?
* **Jawaban Ideal**:  
  *"Buktinya adalah pemanfaatan framework Laravel 10, library Laravel Sanctum, ReactJS, Vite, React Router Dom, Axios HTTP Client, dan ikon Lucide-React secara proporsional sesuai kebutuhan proyek."*

---

## KELOMPOK 9: PERTANYAAN TROUBLESHOOTING & PENGUJIAN

### Q29: Bagaimana Anda membuktikan bahwa API yang Anda buat benar-benar bekerja 100%?
* **Jawaban Ideal**:  
  *"Saya telah membuat dan menjalankan skrip pengujian otomatis `test_e2e_http.js`. Skrip ini mensimulasikan seluruh 15 skenario panggilan HTTP langsung ke port 8000 server Laravel (dari registrasi, login, katalog, keranjang, checkout COD, hingga approval admin) dan seluruhnya dinyatakan **PASS 100%**."*

### Q30: Bagaimana alur verifikasi pesanan Payment at Delivery oleh Admin?
* **Jawaban Ideal**:  
  *"Pesanan baru masuk dengan status `pending` dan pembayaran `unpaid`. Admin memprosesnya menjadi `processing` lalu `shipped`. Saat kurir menyerahkan buku dan menerima uang tunai dari pelanggan, admin mengubah status pesanan menjadi `completed`. Sistem secara otomatis memperbarui status pembayaran menjadi `paid` (Lunas)."*

### Q31: Mengapa dibuat tombol 'Akun Demo Cepat' pada halaman login?
* **Jawaban Ideal**:  
  *"Tombol tersebut dibuat khusus untuk mempercepat dan mempermudah pengujian saat demonstrasi langsung di hadapan asesor BNSP, sehingga penguji tidak perlu menunggu peserta mengetik email dan password secara manual."*

### Q32: Di mana file database MySQL tersimpan saat menggunakan XAMPP?
* **Jawaban Ideal**:  
  *"Secara fisik berkas tabel database tersimpan di direktori `C:\xampp\mysql\data\bookspace_db`."*

### Q33: Apa fungsi perintah `php artisan migrate:fresh --seed`?
* **Jawaban Ideal**:  
  *"Perintah ini menghapus (*drop*) seluruh tabel lama di MySQL, membangun ulang seluruh tabel dari awal berdasarkan berkas migrasi, dan langsung mengisi data awal (*seeder*) akun admin, customer, kategori, dan koleksi buku."*

### Q34: Apa yang terjadi jika token Sanctum di `localStorage` peramban dihapus manual oleh user?
* **Jawaban Ideal**:  
  *"Axios Response Interceptor akan menangkap respons error 401 Unauthenticated dari server, lalu state `AuthContext` otomatis me-reset status login dan mengarahkan pengguna kembali ke halaman `/login`."*

### Q35: Apa pesan atau kesan utama yang ingin Anda sampaikan mengenai aplikasi SudutBaca?
* **Jawaban Ideal**:  
  *"SudutBaca adalah pembuktian bahwa sebuah aplikasi web e-commerce dapat dibangun secara sederhana, berpenampilan hangat dan elegan, memiliki fungsionalitas transaksi yang aman, serta memenuhi seluruh standar kompetensi nasional yang dipersyaratkan oleh BNSP."*
