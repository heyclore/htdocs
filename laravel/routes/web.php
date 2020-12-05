<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/ajax', [App\Http\Controllers\HomeController::class, 'ajax']);

Route::get('/timeline', [App\Http\Controllers\TimelineController::class, 'index'])->name('timeline');

Route::post('/timeline', [App\Http\Controllers\TimelineController::class, 'store']);

Route::delete('/timeline/{quote}', [App\Http\Controllers\TimelineController::class, 'destroy'])->name('timeline.destroy');

Route::get('/user/{user:name}/quotes', [App\Http\Controllers\UserProfileController::class, 'index'])->name('user.quotes');

Route::get('/user/{user:name}/quotes/update/{quote}', [App\Http\Controllers\UserProfileController::class, 'edit'])->name('user.quotes.update');

Route::post('/user/{user:name}/quotes/update/{quote}', [App\Http\Controllers\UserProfileController::class, 'update'])->name('user.quotes.update');
