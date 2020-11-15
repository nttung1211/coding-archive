<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PizzaController;

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

Route::get('/', function () {
  return view('welcome');
});

//Route::get('/pizzas', 'PizzaController@index')->middleware('auth');
// we can add middleware here but we will need to add to every single one
Route::get('/pizzas', 'PizzaController@index')
  ->name('pizzas.index')->middleware('auth');

Route::get('/pizzas/create', 'PizzaController@create')
  ->name('pizzas.create');

Route::post('/pizzas', 'PizzaController@store')
  ->name('pizzas.store');

Route::get('/pizzas/{id}', 'PizzaController@show')
  ->name('pizzas.show')->middleware('auth');

Route::delete('/pizzas/{id}', 'PizzaController@destroy')
  ->name('pizzas.destroy')->middleware('auth');

Auth::routes([
  'register' => false // do not create route for register
]);
// this is basically a lot of routes like above that laravel render for us
// run "php artisan route:list" to see all the route

Route::get('/home', 'HomeController@index')
  ->name('home');
// name() is for naming the route to use in other place with route() then when we want to change the route it's going to be easy

//Route::fallback(function () {
//  return 'tung';
//});
