# Code Reference - All Files Created

## 1. Routes Configuration - routes/api.php

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Authentication endpoints
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Product routes (protected)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// Public product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
```

---

## 2. Authentication Controller - app/Http/Controllers/AuthController.php

Key Methods:
- `register(RegisterRequest $request)` - Create new user and token
- `login(LoginRequest $request)` - Authenticate user and generate token
- `user(Request $request)` - Get authenticated user details
- `logout(Request $request)` - Revoke all tokens for user

Features:
- Password hashing with Hash::make()
- Sanctum token generation with createToken()
- Token revocation on logout
- Try-catch error handling
- JSON responses with consistent format

---

## 3. Product Controller - app/Http/Controllers/ProductController.php

Methods:
- `index()` - Get paginated list (10 per page)
- `show(Product $product)` - Get single product
- `store(StoreProductRequest $request)` - Create new product (protected)
- `update(UpdateProductRequest $request, Product $product)` - Update product (protected)
- `destroy(Product $product)` - Delete product (protected)

Features:
- Route model binding for product routes
- Pagination with metadata
- Request validation through form requests
- Consistent JSON response format

---

## 4. Models

### User Model - app/Models/User.php
```php
protected $fillable = [
    'name',
    'email',
    'password',
];

protected $hidden = [
    'password',
    'remember_token',
];

protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```

### Product Model - app/Models/Product.php
```php
protected $fillable = [
    'name',
    'description',
    'price',
    'stock',
];

protected function casts(): array
{
    return [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
```

---

## 5. Request Validation Classes

### RegisterRequest - app/Http/Requests/RegisterRequest.php
```php
public function rules(): array
{
    return [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6|confirmed',
    ];
}
```

### LoginRequest - app/Http/Requests/LoginRequest.php
```php
public function rules(): array
{
    return [
        'email' => 'required|email',
        'password' => 'required|string',
    ];
}
```

### StoreProductRequest - app/Http/Requests/StoreProductRequest.php
```php
public function rules(): array
{
    return [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0.01',
        'stock' => 'required|integer|min:0',
    ];
}
```

### UpdateProductRequest - app/Http/Requests/UpdateProductRequest.php
```php
public function rules(): array
{
    return [
        'name' => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'price' => 'sometimes|numeric|min:0.01',
        'stock' => 'sometimes|integer|min:0',
    ];
}
```

---

## 6. Database Migration - database/migrations/2025_12_10_create_products_table.php

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2);
    $table->integer('stock')->default(0);
    $table->timestamps();
});
```

---

## 7. Factory - database/factories/ProductFactory.php

```php
public function definition(): array
{
    return [
        'name' => $this->faker->words(3, true),
        'description' => $this->faker->sentences(3, true),
        'price' => $this->faker->randomFloat(2, 10, 1000),
        'stock' => $this->faker->numberBetween(0, 100),
    ];
}
```

---

## 8. Seeder - database/seeders/DatabaseSeeder.php

```php
public function run(): void
{
    // Create a test user
    User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    // Create additional users
    User::factory(5)->create();

    // Create sample products
    Product::factory(20)->create();
}
```

---

## 9. Middleware Configuration - app/Http/Kernel.php

```php
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
    'api' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
];
```

---

## 10. Bootstrap Configuration - bootstrap/app.php

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
```

---

## 11. Service Provider - app/Providers/RouteServiceProvider.php

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Routes are now loaded in bootstrap/app.php
    }
}
```

---

## Request/Response Examples

### Register Request
```json
POST /api/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Register Response (201)
```json
{
  "status": "success",
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "3|abc123def456..."
}
```

### Login Request
```json
POST /api/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Login Response (200)
```json
{
  "status": "success",
  "message": "Logged in successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "3|abc123def456..."
}
```

### Create Product Request
```json
POST /api/products
Authorization: Bearer {token}

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stock": 15
}
```

### Create Product Response (201)
```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": 21,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": "999.99",
    "stock": 15,
    "created_at": "2025-12-10T12:00:00.000000Z",
    "updated_at": "2025-12-10T12:00:00.000000Z"
  }
}
```

### Get Products Response (200)
```json
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

### Error Response (401)
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

### Validation Error Response (422)
```json
{
  "message": "The email field is required.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

---

## Key Features Summary

1. **Sanctum Authentication**
   - Token-based API authentication
   - Personal access tokens for users
   - Token revocation on logout

2. **Request Validation**
   - Form Request classes for type-safe validation
   - Email uniqueness checking
   - Password confirmation for register
   - Price and stock validation for products

3. **Model Relationships**
   - User model extends Authenticatable
   - Uses Sanctum traits for token management
   - Product model with proper attributes

4. **Error Handling**
   - Try-catch blocks in all controllers
   - Consistent error response format
   - Proper HTTP status codes

5. **Database**
   - PostgreSQL configured
   - Proper migrations with timestamps
   - Factory pattern for test data
   - Seeder for initial data

6. **API Standards**
   - RESTful endpoints
   - JSON request/response
   - Pagination support
   - Bearer token authentication

---

**All code is production-ready and follows Laravel best practices!**
