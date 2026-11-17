<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Akun Administrator
        User::updateOrCreate(
            ['email' => 'admin@bookspace.com'],
            [
                'name' => 'Admin SudutBaca',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        // 2. Akun Customer Pengujian (Budi)
        User::updateOrCreate(
            ['email' => 'budi@gmail.com'],
            [
                'name' => 'Budi Pratama',
                'password' => Hash::make('password123'),
                'role' => 'user',
            ]
        );

        // 3. Akun Customer Tambahan
        User::updateOrCreate(
            ['email' => 'siti@gmail.com'],
            [
                'name' => 'Siti Nurhaliza',
                'password' => Hash::make('password123'),
                'role' => 'user',
            ]
        );
    }
}
