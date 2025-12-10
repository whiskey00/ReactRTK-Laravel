## Quick Testing Guide - Laravel API with Postman

### Step 1: Run Migrations & Seed Database
```bash
php artisan migrate
php artisan db:seed
```

### Step 2: Start Laravel Server
```bash
php artisan serve
```
Server will be available at: `http://localhost:8000`

### Step 3: Test in Postman

#### Test 1: Register New User
```
POST http://localhost:8000/api/register

Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

Expected Response (201):
{
  "status": "success",
  "message": "User registered successfully",
  "user": {
    "id": 8,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "3|abcdefghijklmnopqrstuvwxyz..."
}
```

**Copy the token for next requests!**

---

#### Test 2: Login
```
POST http://localhost:8000/api/login

Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}

Expected Response (200):
{
  "status": "success",
  "message": "Logged in successfully",
  "user": {
    "id": 8,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "3|..."
}
```

---

#### Test 3: Get Current User (Protected)
```
GET http://localhost:8000/api/user

Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Expected Response (200):
{
  "status": "success",
  "user": {
    "id": 8,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-12-10T12:00:00.000000Z"
  }
}
```

---

#### Test 4: Get All Products (Public)
```
GET http://localhost:8000/api/products

Expected Response (200):
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Product 1",
      "description": "...",
      "price": "99.99",
      "stock": 10,
      "created_at": "...",
      "updated_at": "..."
    },
    ...
  ],
  "pagination": {
    "current_page": 1,
    "total": 20,
    "per_page": 10,
    "last_page": 2
  }
}
```

---

#### Test 5: Get Single Product (Public)
```
GET http://localhost:8000/api/products/1

Expected Response (200):
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Product 1",
    "description": "...",
    "price": "99.99",
    "stock": 10,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

---

#### Test 6: Create Product (Protected)
```
POST http://localhost:8000/api/products

Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with USB receiver",
  "price": 29.99,
  "stock": 50
}

Expected Response (201):
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 21,
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "price": "29.99",
    "stock": 50,
    "created_at": "2025-12-10T12:00:00.000000Z",
    "updated_at": "2025-12-10T12:00:00.000000Z"
  }
}
```

---

#### Test 7: Update Product (Protected)
```
PUT http://localhost:8000/api/products/21

Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "price": 24.99,
  "stock": 45
}

Expected Response (200):
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": 21,
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "price": "24.99",
    "stock": 45,
    "created_at": "2025-12-10T12:00:00.000000Z",
    "updated_at": "2025-12-10T12:00:00.000000Z"
  }
}
```

---

#### Test 8: Delete Product (Protected)
```
DELETE http://localhost:8000/api/products/21

Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Expected Response (200):
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

---

#### Test 9: Logout (Protected)
```
POST http://localhost:8000/api/logout

Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Expected Response (200):
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

### Validation Error Examples

#### Invalid Email Format
```
POST http://localhost:8000/api/register

Body:
{
  "name": "Test",
  "email": "invalid-email",
  "password": "password123",
  "password_confirmation": "password123"
}

Response (422):
{
  "message": "The email field must be a valid email address.",
  "errors": {
    "email": ["The email field must be a valid email address."]
  }
}
```

#### Password Mismatch
```
POST http://localhost:8000/api/register

Body:
{
  "name": "Test",
  "email": "test@example.com",
  "password": "password123",
  "password_confirmation": "different123"
}

Response (422):
{
  "message": "The password confirmation does not match.",
  "errors": {
    "password": ["Passwords do not match."]
  }
}
```

#### Duplicate Email
```
POST http://localhost:8000/api/register

Body:
{
  "name": "Another User",
  "email": "test@example.com",  // Already exists!
  "password": "password123",
  "password_confirmation": "password123"
}

Response (422):
{
  "message": "The email has already been taken.",
  "errors": {
    "email": ["This email is already registered."]
  }
}
```

#### Invalid Credentials
```
POST http://localhost:8000/api/login

Body:
{
  "email": "test@example.com",
  "password": "wrongpassword"
}

Response (401):
{
  "status": "error",
  "message": "Invalid credentials"
}
```

#### Unauthorized Request
```
GET http://localhost:8000/api/user

Headers:
Authorization: Bearer invalid-token-or-missing

Response (401):
{
  "message": "Unauthenticated."
}
```

---

### Database Data

#### Test User (Pre-seeded)
```
Email: test@example.com
Password: password
(All other users are randomly generated)
```

#### Pre-seeded Products
- 20 sample products are created with the seeder
- Each has random name, description, price ($10-$1000), and stock (0-100)

---

### Tips

1. **Always copy tokens**: After login/register, copy the full token value
2. **Include Bearer prefix**: `Authorization: Bearer {token}` (note the space)
3. **Check content type**: Make sure requests have `Content-Type: application/json`
4. **Test order**: Register → Create Product → Read Product → Update Product → Delete Product → Logout
5. **Pagination**: Use `?page=2` to get next page of products

---

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 404 Not Found | Check URL is correct: `http://localhost:8000/api/...` |
| 401 Unauthorized | Token missing or invalid - re-login to get new token |
| 422 Validation Error | Check request body matches validation rules |
| 500 Server Error | Check Laravel logs: `storage/logs/laravel.log` |
| Database Connection Error | Verify `.env` PostgreSQL credentials |
| Routes not showing | Run `php artisan route:list --path=api` |

---

**All endpoints are ready for testing!** 🚀
