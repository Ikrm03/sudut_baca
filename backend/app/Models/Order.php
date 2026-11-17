<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'recipient_name',
        'phone',
        'shipping_address',
        'total_price',
        'payment_method',
        'payment_status',
        'order_status',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
    ];

    /**
     * Relasi ke user pembuat pesanan
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke detail item pesanan
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
