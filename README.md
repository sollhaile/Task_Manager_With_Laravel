# Task_Manager_With_Laravel


A simple **Task Management System** built with **Laravel** to create, update, and manage tasks efficiently.

## Features

- CRUD operations for tasks
- User authentication
- RESTful API endpoints

## Installation

```bash
git clone https://github.com/sollhaile/Task_Manager_With_Laravel.git
cd Task_Manager_With_Laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
