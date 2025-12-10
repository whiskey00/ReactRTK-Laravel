# Laravel API Backend Setup Guide

## Overview
This is a complete Laravel 11 backend with PostgreSQL database, Sanctum authentication, and CRUD API endpoints for Products.

## Prerequisites
- PHP 8.2+
- PostgreSQL
- Composer
- Laravel 11

## Environment Setup

### .env Configuration
Your `.env` is already configured for PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=switchyard.proxy.rlwy.net
DB_PORT=28250
DB_DATABASE=railway
DB_USERNAME=postgres
DB_PASSWORD=xzdWJYwNUtAuZgfBbQvBDNKvqCXuweZF
```

## Database Setup

### Run Migrations
```bash
php artisan migrate
```

This creates:
- `users` table (with Sanctum tokens support)
- `personal_access_tokens` table (Sanctum)
- `products` table (name, description, price, stock)

### Seed Sample Data
```bash
php artisan db:seed
```

This creates:
- 1 test user (email: test@example.com, password: password)
- 5 additional random users
- 20 sample products

## API Endpoints

### Authentication (Public)

#### Register User
```
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

Response (201):
{
  "status": "success",
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "3|abcdefghijklmnopqrstuvwxyz..."
}
```

#### Login User
```
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "status": "success",
  "message": "Logged in successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "3|abcdefghijklmnopqrstuvwxyz..."
}
```

### User Management (Protected - Requires Token)

#### Get Current User
```
GET /api/user
Authorization: Bearer {token}

Response (200):
{
  "status": "success",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-12-10T10:00:00.000000Z"
  }
}
```

#### Logout
```
POST /api/logout
Authorization: Bearer {token}

Response (200):
{
  "status": "success",
  "message": "Logged out successfully"
}
```

### Products (Public Read)

#### Get All Products
```
GET /api/products

Response (200):
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": "99.99",
      "stock": 10,
      "created_at": "2025-12-10T10:00:00.000000Z",
      "updated_at": "2025-12-10T10:00:00.000000Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total": 20,
    "per_page": 10,
    "last_page": 2
  }
}
```

#### Get Single Product
```
GET /api/products/{id}

Response (200):
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": "99.99",
    "stock": 10,
    "created_at": "2025-12-10T10:00:00.000000Z",
    "updated_at": "2025-12-10T10:00:00.000000Z"
  }
}
```

### Products CRUD (Protected - Requires Token)

#### Create Product
```
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop with SSD",
  "price": 999.99,
  "stock": 15
}

Response (201):
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 21,
    "name": "Laptop",
    "description": "High-performance laptop with SSD",
    "price": "999.99",
    "stock": 15,
    "created_at": "2025-12-10T10:00:00.000000Z",
    "updated_at": "2025-12-10T10:00:00.000000Z"
  }
}
```

#### Update Product
```
PUT /api/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 899.99,
  "stock": 10
}

Response (200):
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": 21,
    "name": "Updated Laptop",
    "description": "High-performance laptop with SSD",
    "price": "899.99",
    "stock": 10,
    "created_at": "2025-12-10T10:00:00.000000Z",
    "updated_at": "2025-12-10T10:00:00.000000Z"
  }
}
```

#### Delete Product
```
DELETE /api/products/{id}
Authorization: Bearer {token}

Response (200):
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

## Validation Rules

### Register Request
- `name`: required, string, max 255 characters
- `email`: required, email, unique in users table
- `password`: required, string, min 6 characters, must be confirmed

### Login Request
- `email`: required, email
- `password`: required, string

### Create Product
- `name`: required, string, max 255 characters
- `description`: optional, string
- `price`: required, numeric, min 0.01
- `stock`: required, integer, min 0

### Update Product
- `name`: optional, string, max 255 characters
- `description`: optional, string
- `price`: optional, numeric, min 0.01
- `stock`: optional, integer, min 0

## File Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php       # Authentication logic
│   │   │   └── ProductController.php    # Product CRUD
│   │   ├── Kernel.php                   # Middleware configuration
│   │   └── Requests/
│   │       ├── LoginRequest.php
│   │       ├── RegisterRequest.php
│   │       ├── StoreProductRequest.php
│   │       └── UpdateProductRequest.php
│   ├── Models/
│   │   ├── User.php                     # User model with Sanctum
│   │   └── Product.php                  # Product model
│   └── Providers/
│       └── RouteServiceProvider.php     # Route provider (updated for Laravel 11)
├── bootstrap/
│   └── app.php                          # Application bootstrap (routes configured)
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   └── ProductFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2025_12_10_112919_create_personal_access_tokens_table.php
│   │   └── 2025_12_10_create_products_table.php
│   └── seeders/
│       └── DatabaseSeeder.php           # Seeds test users and products
├── routes/
│   ├── api.php                          # API routes
│   ├── web.php
│   └── console.php
└── .env                                 # Environment configuration
```

## Quick Start Commands

```bash
# 1. Run migrations
php artisan migrate

# 2. Seed the database
php artisan db:seed

# 3. Start the development server
php artisan serve

# 4. Check all API routes
php artisan route:list

# 5. View only API routes
php artisan route:list --path=api
```

## Testing with Postman

1. **Import Postman Collection**: Import `Laravel-API-Postman.json` into Postman
2. **Register**: Use the Register endpoint to create a user and get a token
3. **Copy Token**: Save the token from the response
4. **Set Authorization**: Replace `YOUR_TOKEN_HERE` with your actual token in each protected request
5. **Test Endpoints**: All CRUD operations are ready to test

## Authentication Flow

1. **Register or Login** → Get Bearer Token
2. **Add to Headers**: `Authorization: Bearer {your_token}`
3. **Access Protected Routes**: Create/Update/Delete Products

## Key Features

✅ PostgreSQL database integration
✅ Sanctum token-based authentication
✅ User registration with password hashing
✅ User login with token generation
✅ Product CRUD operations
✅ Request validation for all endpoints
✅ Protected routes for authenticated users
✅ Pagination for product listing
✅ JSON response format
✅ Error handling with try-catch
✅ Sample data seeding
✅ Postman-ready collection

## Notes

- Passwords are hashed using bcrypt (configured in User model)
- Tokens are generated per login and previous tokens are invalidated
- Product endpoints are public for GET (index, show)
- Product endpoints are protected for POST, PUT, DELETE
- All responses follow a consistent JSON format with status and data
- Pagination shows 10 products per page

## Troubleshooting

**Routes not showing up?**
```bash
php artisan route:list
```

**Database connection error?**
- Verify `.env` database credentials
- Ensure PostgreSQL is running

**Token invalid?**
- Make sure token is copied correctly from login response
- Tokens include pipe separator: `id|token_string`

**CSRF Token error on web routes?**
- This is expected for API routes (not using web middleware)
- All API routes use `api` middleware which includes Sanctum

---

**Created**: December 10, 2025
**Laravel Version**: 11
**Database**: PostgreSQL
**Authentication**: Sanctum
