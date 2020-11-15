<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
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

Route::get('/', [HomeController::class, 'index']);

Route::prefix('/posts')->group(function () {
	Route::name('posts.')->group(function () {
		// INDEX (SHOW USER'S POSTS)
		Route::get('', [PostController::class, 'index'])
			->name('index')->middleware('auth');

		// SHOW DETAIL
		Route::get('show/{id}', [PostController::class, 'show'])
			->name('show');

		// ADD POST
		Route::get('create', [PostController::class, 'create'])
			->name('create')->middleware('auth');

		Route::post('store', [PostController::class, 'store'])
			->name('store')->middleware('auth');

		// EDIT POST
		Route::get('edit/{id}', [PostController::class, 'edit'])
			->name('edit')->middleware('auth');

		Route::patch('update/{id}', [PostController::class, 'update'])
			->name('update')->middleware('auth');

		// DELETE POST
		Route::delete('delete/{id}', [PostController::class, 'delete'])
			->name('delete')->middleware('auth');

	});
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
