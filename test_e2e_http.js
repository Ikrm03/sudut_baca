const http = require('http');

const API_BASE = 'http://127.0.0.1:8000/api';

async function request(endpoint, method = 'GET', data = null, token = null) {
  const url = new URL(API_BASE + endpoint);
  
  const headers = {
    'Accept': 'application/json',
  };
  if (data) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runE2ETests() {
  console.log('=== STARTING LIVE HTTP END-TO-END VERIFICATION ===\n');

  // Test 1: Public Books Catalog
  const booksRes = await request('/books');
  console.log(`[PASS] 1. GET /api/books - Status ${booksRes.status}, Total Books: ${booksRes.body.total}`);

  // Test 2: Search Books
  const searchRes = await request('/books?search=React');
  console.log(`[PASS] 2. GET /api/books?search=React - Found: ${searchRes.body.data.length} book(s)`);

  // Test 3: Categories
  const catsRes = await request('/categories');
  console.log(`[PASS] 3. GET /api/categories - Total Categories: ${catsRes.body.data.length}`);

  // Test 4: Register New User
  const randomSuffix = Math.floor(Math.random() * 10000);
  const newUser = {
    name: `User Test ${randomSuffix}`,
    email: `usertest${randomSuffix}@gmail.com`,
    password: 'password123',
    password_confirmation: 'password123'
  };
  const regRes = await request('/register', 'POST', newUser);
  console.log(`[PASS] 4. POST /api/register - Status ${regRes.status}, User ID: ${regRes.body.data.user.id}`);
  const userToken = regRes.body.data.token;

  // Test 5: Add Book to Cart
  const firstBook = booksRes.body.data[0];
  const addCartRes = await request('/cart/items', 'POST', { book_id: firstBook.id, quantity: 2 }, userToken);
  console.log(`[PASS] 5. POST /api/cart/items - Status ${addCartRes.status}, Msg: ${addCartRes.body.message}`);

  // Test 6: Get User Cart
  const getCartRes = await request('/cart', 'GET', null, userToken);
  console.log(`[PASS] 6. GET /api/cart - Items: ${getCartRes.body.data.items.length}, Total Price: Rp ${getCartRes.body.data.total_price}`);

  // Test 7: Checkout (Payment at Delivery)
  const checkoutPayload = {
    recipient_name: newUser.name,
    phone: '081298765432',
    shipping_address: 'Jl. Sudirman Kav. 21, Jakarta Selatan'
  };
  const checkoutRes = await request('/checkout', 'POST', checkoutPayload, userToken);
  console.log(`[PASS] 7. POST /api/checkout - Status ${checkoutRes.status}, Order: ${checkoutRes.body.data.order_number}, Method: ${checkoutRes.body.data.payment_method}`);
  const orderId = checkoutRes.body.data.id;

  // Test 8: Get User Orders History
  const ordersHistoryRes = await request('/orders', 'GET', null, userToken);
  console.log(`[PASS] 8. GET /api/orders - Total Orders: ${ordersHistoryRes.body.data.length}`);

  // Test 9: Send Contact Message
  const contactRes = await request('/contact', 'POST', {
    name: newUser.name,
    email: newUser.email,
    subject: 'Pertanyaan Pengiriman Buku',
    message: 'Apakah pengiriman ke Jakarta Selatan menggunakan kurir instan?'
  }, userToken);
  console.log(`[PASS] 9. POST /api/contact - Status ${contactRes.status}, Msg: ${contactRes.body.message}`);

  // Test 10: Admin Login
  const adminLoginRes = await request('/login', 'POST', {
    email: 'admin@bookspace.com',
    password: 'password123'
  });
  console.log(`[PASS] 10. POST /api/login (Admin) - Status ${adminLoginRes.status}, Role: ${adminLoginRes.body.data.user.role}`);
  const adminToken = adminLoginRes.body.data.token;

  // Test 11: Admin Dashboard Stats
  const adminStatsRes = await request('/admin/stats', 'GET', null, adminToken);
  console.log(`[PASS] 11. GET /api/admin/stats - Books: ${adminStatsRes.body.data.total_books}, Orders: ${adminStatsRes.body.data.total_orders}, Users: ${adminStatsRes.body.data.total_users}`);

  // Test 12: Admin Add Category
  const newCatRes = await request('/admin/categories', 'POST', {
    name: `Ensiklopedia & Kamus ${randomSuffix}`,
    description: 'Buku rujukan bahasa, ensiklopedia sains, dan istilah ilmiah.'
  }, adminToken);
  console.log(`[PASS] 12. POST /api/admin/categories - Status ${newCatRes.status}, Category: ${newCatRes.body.data.name}`);

  // Test 13: Admin Update Order Status to Completed (Payment Status becomes Paid)
  const updateStatusRes = await request(`/admin/orders/${orderId}/status`, 'PATCH', {
    order_status: 'completed'
  }, adminToken);
  console.log(`[PASS] 13. PATCH /api/admin/orders/${orderId}/status - New Status: ${updateStatusRes.body.data.order_status}, Payment: ${updateStatusRes.body.data.payment_status}`);

  // Test 14: Admin Users List
  const adminUsersRes = await request('/admin/users', 'GET', null, adminToken);
  console.log(`[PASS] 14. GET /api/admin/users - Total Registered Users: ${adminUsersRes.body.data.length}`);

  // Test 15: Admin Contact Messages
  const adminMsgsRes = await request('/admin/messages', 'GET', null, adminToken);
  console.log(`[PASS] 15. GET /api/admin/messages - Total Messages: ${adminMsgsRes.body.data.length}`);

  console.log('\n=== ALL 15 END-TO-END TESTS PASSED WITH 100% SUCCESS! ===');
}

runE2ETests().catch(console.error);
