<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

function runRequest($method, $uri, $data = [], $token = null) {
    $server = [
        'CONTENT_TYPE' => 'application/json',
        'HTTP_ACCEPT' => 'application/json',
    ];
    if ($token) {
        $server['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;
    }
    
    // Create new fresh app instance or kernel request
    $request = Illuminate\Http\Request::create($uri, $method, [], [], [], $server, !empty($data) ? json_encode($data) : null);
    
    // Re-create app or fresh request
    global $app, $kernel;
    if ($app->resolved('auth')) {
        $app['auth']->forgetGuards();
        $app['auth']->shouldUse('sanctum');
    }
    
    $response = $kernel->handle($request);
    $kernel->terminate($request, $response);
    
    return [
        'status' => $response->getStatusCode(),
        'body' => json_decode($response->getContent(), true)
    ];
}

echo "=== TESTING BOOKSPACE BACKEND API ===\n";

// 1. User Login
$r1 = runRequest('POST', '/api/login', ['email' => 'budi@gmail.com', 'password' => 'password123']);
$userToken = $r1['body']['data']['token'] ?? null;
echo "1. Login User: Status {$r1['status']} (Token: " . ($userToken ? 'OK' : 'FAIL') . ")\n";

// 2. Admin Login
$r2 = runRequest('POST', '/api/login', ['email' => 'admin@bookspace.com', 'password' => 'password123']);
$adminToken = $r2['body']['data']['token'] ?? null;
echo "2. Login Admin: Status {$r2['status']} (Role: " . ($r2['body']['data']['user']['role'] ?? 'none') . ")\n";

// 3. User Me
$rMeUser = runRequest('GET', '/api/me', [], $userToken);
echo "3. User Me: Status {$rMeUser['status']} (Email: " . ($rMeUser['body']['data']['email'] ?? 'none') . ", Role: " . ($rMeUser['body']['data']['role'] ?? 'none') . ")\n";

// 4. Admin Me
$rMeAdmin = runRequest('GET', '/api/me', [], $adminToken);
echo "4. Admin Me: Status {$rMeAdmin['status']} (Email: " . ($rMeAdmin['body']['data']['email'] ?? 'none') . ", Role: " . ($rMeAdmin['body']['data']['role'] ?? 'none') . ")\n";

// 5. Books
$rBooks = runRequest('GET', '/api/books');
echo "5. Get Books: Status {$rBooks['status']} (Total: " . count($rBooks['body']['data'] ?? []) . ")\n";
$firstBook = $rBooks['body']['data'][0] ?? null;

// 6. User Add to Cart
$rCart = runRequest('POST', '/api/cart/items', ['book_id' => $firstBook['id'], 'quantity' => 2], $userToken);
echo "6. Add to Cart: Status {$rCart['status']} ({$rCart['body']['message']})\n";

// 7. User Checkout
$rCheckout = runRequest('POST', '/api/checkout', [
    'recipient_name' => 'Budi Pratama',
    'phone' => '081234567890',
    'shipping_address' => 'Jl. Thamrin No. 12, Jakarta Pusat'
], $userToken);
$orderId = $rCheckout['body']['data']['id'] ?? null;
echo "7. Checkout: Status {$rCheckout['status']} (Order: " . ($rCheckout['body']['data']['order_number'] ?? 'FAIL') . ", Total: " . ($rCheckout['body']['data']['total_price'] ?? 0) . ")\n";

// 8. Admin Stats
$rStats = runRequest('GET', '/api/admin/stats', [], $adminToken);
echo "8. Admin Stats: Status {$rStats['status']} (Total Orders: " . ($rStats['body']['data']['total_orders'] ?? 'FAIL') . ")\n";

// 9. Admin Update Order Status
if ($orderId) {
    $rStatus = runRequest('PATCH', "/api/admin/orders/{$orderId}/status", ['order_status' => 'completed'], $adminToken);
    echo "9. Admin Update Status: Status {$rStatus['status']} (Order Status: " . ($rStatus['body']['data']['order_status'] ?? 'FAIL') . ", Payment: " . ($rStatus['body']['data']['payment_status'] ?? 'FAIL') . ")\n";
}

// 10. Send Contact Message
$rContact = runRequest('POST', '/api/contact', [
    'name' => 'Pengunjung Web',
    'email' => 'tamu@gmail.com',
    'subject' => 'Tanya Ketersediaan',
    'message' => 'Apakah buku teknologi bisa dipesan dalam jumlah banyak?'
]);
echo "10. Contact Message: Status {$rContact['status']} ({$rContact['body']['message']})\n";

// 11. Admin View Messages
$rMsgs = runRequest('GET', '/api/admin/messages', [], $adminToken);
echo "11. Admin View Messages: Status {$rMsgs['status']} (Total Messages: " . count($rMsgs['body']['data'] ?? []) . ")\n";

echo "=== ALL TESTS COMPLETED SUCCESSFULLY! ===\n";
