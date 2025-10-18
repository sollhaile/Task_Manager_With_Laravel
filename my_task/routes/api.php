<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
*/
// GET route - for fetching data
Route::get('/tasks', [TaskController::class, 'index']);


// POST route - for creating data
Route::post('/tasks', [TaskController::class, 'store']);



// PUT route - for updating data
Route::put('/tasks/{id}', [TaskController::class, 'update']);

// DELETE route - for deleting data
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Your API routes will go here