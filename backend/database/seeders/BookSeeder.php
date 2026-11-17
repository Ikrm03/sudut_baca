<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tech = Category::where('name', 'Teknologi & Pemrograman')->first();
        $biz = Category::where('name', 'Bisnis & Manajemen')->first();
        $self = Category::where('name', 'Pengembangan Diri')->first();
        $science = Category::where('name', 'Sains & Matematika')->first();
        $fiction = Category::where('name', 'Fiksi & Sastra')->first();

        $books = [
            [
                'category_id' => $tech ? $tech->id : 1,
                'title' => 'Mastering React & Modern JavaScript',
                'author' => 'Alexandria Rivers',
                'description' => 'Panduan komprehensif menguasai ekosistem React modern, Single Page Application, state management, dan arsitektur frontend skala enterprise.',
                'price' => 125000.00,
                'stock' => 20,
                'cover' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
            ],
            [
                'category_id' => $tech ? $tech->id : 1,
                'title' => 'Arsitektur REST API dengan Laravel 10',
                'author' => 'Bambang Wicaksono',
                'description' => 'Membangun layanan backend modern yang aman, terstruktur, dan skalabel menggunakan framework PHP Laravel dan autentikasi Sanctum.',
                'price' => 135000.00,
                'stock' => 15,
                'cover' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
            ],
            [
                'category_id' => $biz ? $biz->id : 2,
                'title' => 'Strategi Bisnis Digital Era AI',
                'author' => 'Prof. Hendra Kusuma',
                'description' => 'Menavigasi transformasi bisnis modern dengan mengintegrasikan otomatisasi cerdas, analisa data pelanggan, dan eksekusi strategi yang gesit.',
                'price' => 110000.00,
                'stock' => 12,
                'cover' => 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop&q=80',
            ],
            [
                'category_id' => $self ? $self->id : 3,
                'title' => 'Filosofi Fokus & Seni Produktivitas',
                'author' => 'Dewi Sartika Wijaya',
                'description' => 'Cara menjaga fokus mendalam di tengah dunia yang penuh distraksi digital, membangun kebiasaan efektif, dan mencapai kepuasan berkarya.',
                'price' => 95000.00,
                'stock' => 30,
                'cover' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
            ],
            [
                'category_id' => $science ? $science->id : 4,
                'title' => 'Menjelajah Alam Semesta & Fisika Kuantum',
                'author' => 'Dr. Farhan Ramadhan',
                'description' => 'Penjelasan populer tentang misteri kosmos, partikel subatomik, relativitas umum, dan masa depan penjelajahan ruang angkasa antargalaksi.',
                'price' => 145000.00,
                'stock' => 10,
                'cover' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
            ],
            [
                'category_id' => $fiction ? $fiction->id : 5,
                'title' => 'Kembara Cahaya di Balik Cakrawala',
                'author' => 'Nirwana Chandra',
                'description' => 'Kisah epik persahabatan, keberanian, dan pencarian jati diri di tengah lanskap kepulauan nusantara yang memukau.',
                'price' => 88000.00,
                'stock' => 25,
                'cover' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
            ],
        ];

        foreach ($books as $b) {
            Book::updateOrCreate(
                ['title' => $b['title']],
                $b
            );
        }
    }
}
