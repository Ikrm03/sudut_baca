<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'author',
        'description',
        'price',
        'stock',
        'cover',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
    ];

    protected $appends = ['cover_url'];

    /**
     * Accessor untuk URL cover gambar buku
     */
    public function getCoverUrlAttribute()
    {
        if (!$this->cover) {
            return null;
        }

        if (filter_var($this->cover, FILTER_VALIDATE_URL)) {
            return $this->cover;
        }

        return url('storage/' . $this->cover);
    }

    /**
     * Relasi ke kategori
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relasi ke item keranjang
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Relasi ke detail pesanan
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
