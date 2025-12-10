#!/bin/bash
# Laravel API Backend - Quick Start Commands

# ============================================
# DATABASE SETUP
# ============================================

# Run all pending migrations
php artisan migrate

# Run migrations with fresh database (WARNING: deletes all data!)
php artisan migrate:fresh

# Run migrations and seed the database
php artisan migrate:fresh --seed

# Rollback last migration
php artisan migrate:rollback

# Seed the database only
php artisan db:seed

# ============================================
# DEVELOPMENT SERVER
# ============================================

# Start Laravel development server
php artisan serve

# Start server on specific port
php artisan serve --port=8001

# Start server on specific host and port
php artisan serve --host=0.0.0.0 --port=8000

# ============================================
# ROUTING
# ============================================

# List all routes
php artisan route:list

# List only API routes
php artisan route:list --path=api

# List routes with methods
php artisan route:list --method=POST

# ============================================
# CACHE & CONFIG
# ============================================

# Clear all caches
php artisan cache:clear

# Clear route cache
php artisan route:cache

# Clear configuration cache
php artisan config:cache

# Regenerate config cache
php artisan config:cache && php artisan route:cache

# ============================================
# TINKER (Interactive Shell)
# ============================================

# Start interactive shell to test code
php artisan tinker

# In tinker:
# App\Models\User::all();
# App\Models\Product::create(['name' => 'Test', 'price' => 9.99, 'stock' => 10]);
# App\Models\Product::find(1)->delete();

# ============================================
# DATABASE UTILITIES
# ============================================

# Connect to database directly (PostgreSQL)
psql -h switchyard.proxy.rlwy.net -p 28250 -U postgres -d railway

# SQL Commands (after connecting):
# \dt                    - List all tables
# SELECT * FROM products; - View all products
# \q                     - Exit

# ============================================
# TESTING
# ============================================

# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/ExampleTest.php

# Run with coverage
php artisan test --coverage

# ============================================
# DEBUGGING
# ============================================

# View recent logs
tail -f storage/logs/laravel.log

# Clear logs
rm storage/logs/laravel.log

# Check syntax of PHP file
php -l app/Http/Controllers/AuthController.php

# ============================================
# GENERATE NEW FILES
# ============================================

# Create a new migration
php artisan make:migration create_table_name_table

# Create a new model with migration
php artisan make:model ModelName -m

# Create a new controller
php artisan make:controller ControllerName

# Create a new form request
php artisan make:request RequestName

# Create a new service provider
php artisan make:provider ProviderName

# ============================================
# HELPFUL SHORTCUTS
# ============================================

# Full setup: migrate, seed, and start server
php artisan migrate:fresh --seed && php artisan serve

# Quick test: register user, login, create product
# Use Postman collection (Laravel-API-Postman.json)

# Check what changed in git
git status

# View recent git logs
git log --oneline -10

# ============================================
# PRODUCTION PREPARATION
# ============================================

# Optimize autoloader
composer dump-autoload -o

# Clear all cache
php artisan cache:clear && php artisan route:cache && php artisan config:cache

# Set production environment
# In .env file: APP_ENV=production

# Disable debug mode (for production)
# In .env file: APP_DEBUG=false

# ============================================
# POSTMAN TESTING WORKFLOW
# ============================================

# 1. Start server
php artisan serve

# 2. Import Postman collection
# File > Import > Select Laravel-API-Postman.json

# 3. Register new user
# POST /api/register - Copy the token

# 4. Test endpoints
# GET /api/products - No auth needed
# POST /api/products - Add Authorization header

# 5. Create/Update/Delete products
# Use token from step 3

# ============================================
# COMMON ISSUES & FIXES
# ============================================

# Issue: Migrations not running
# Fix: php artisan migrate --step

# Issue: Routes not found (404)
# Fix: php artisan route:cache

# Issue: Database connection error
# Fix: Check .env database credentials

# Issue: Token not working
# Fix: Make sure token includes "Bearer " prefix and full token value

# Issue: CORS errors
# Fix: Configure CORS in config/cors.php (if React frontend)

# ============================================
# USEFUL INFO
# ============================================

# Laravel version
php artisan --version

# PHP version
php --version

# Composer version
composer --version

# Check installed packages
composer list

# ============================================
# EXAMPLE WORKFLOW
# ============================================

# 1. Setup database
php artisan migrate:fresh --seed

# 2. Start server
php artisan serve

# 3. In another terminal, test with curl
curl http://localhost:8000/api/products

# 4. Register user
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123","password_confirmation":"password123"}'

# 5. Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# 6. Create product (replace TOKEN with actual token)
curl -X POST http://localhost:8000/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99,"stock":5,"description":"Test laptop"}'

# ============================================
# IMPORTANT FILES REFERENCE
# ============================================

# Routes
# backend/routes/api.php

# Controllers
# backend/app/Http/Controllers/AuthController.php
# backend/app/Http/Controllers/ProductController.php

# Models
# backend/app/Models/User.php
# backend/app/Models/Product.php

# Migrations
# backend/database/migrations/2025_12_10_create_products_table.php

# Configuration
# backend/.env
# backend/bootstrap/app.php

# Documentation
# backend/API_SETUP_GUIDE.md
# backend/POSTMAN_TESTING_GUIDE.md
# backend/CODE_REFERENCE.md
# backend/BACKEND_SUMMARY.md

# Postman Collection
# backend/Laravel-API-Postman.json

# ============================================
# END OF QUICK START COMMANDS
# ============================================
