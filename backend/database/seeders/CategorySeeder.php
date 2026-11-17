<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Teknologi & Pemrograman',
                'description' => 'Buku seputar rekayasa perangkat lunak, web development, dan kecerdasan buatan.',
            ],
            [
                'name' => 'Bisnis & Manajemen',
                'description' => 'Panduan wirausaha, strategi manajemen modern, dan literasi finansial.',
            ],
            [
                'name' => 'Pengembangan Diri',
                'description' => 'Buku motivasi, produktivitas, psikologi populer, dan kebiasaan positif.',
            ],
            [
                'name' => 'Sains & Matematika',
                'description' => 'Eksplorasi ilmu pengetahuan alam, fisika, logika, dan kosmologi.',
            ],
            [
                'name' => 'Fiksi & Sastra',
                'description' => 'Karya sastra pilihan, novel fiksi inspiratif, dan antologi cerita.',
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['name' => $cat['name']], $cat);
        }
    }
}
