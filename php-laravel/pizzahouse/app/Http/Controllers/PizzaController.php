<?php

namespace App\Http\Controllers;

use App\Pizza;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class PizzaController extends Controller {
//  public function __construct()
//  {
//    $this->middleware('auth'); // call middleware here will affect all the methods of this class which is more efficient than adding in the routes. However, we still want to allow guest to create order then in this case adding in the route is reasonable
//  }

  public function index() {
//    $pizzas = Pizza::all();
    $pizzas = Pizza::orderBy('base', 'desc')->get();
//    $pizzas = Pizza::where('type', 'Vietnam')->get();
//    $pizzas = Pizza::selectRaw('base, count(*)')->where('type', 'french')->groupBy('base')->get(); // we also have other raw
//    $pizzas = Pizza::latest()->get();
//    $pizzas = Pizza::count();
//    return $pizzas;
    return view('pizzas.index', [
      'pizzas' => $pizzas
    ]);
  }

  public function show($id) {
//    $pizza = Pizza::find($id, ['name', 'type']);
//  *  return request()->query('name'); // return only query string. 'id' does not count (if we wanted to use query string, we do not need to do anything we the route, we will just get them here using query() but we do need a first parameter there
    try {
      $pizza = Pizza::findOrFail($id);

      return view('pizzas.show', [
        'pizza' => $pizza
      ]);
    } catch (ModelNotFoundException $e) {
      error_log($e->getMessage());
      return redirect('/pizzas')->with('error', 'ID: ' . $id . ' not found');
    }
  }

  public function create() {
    return view('pizzas.create'); // we can pass data as the second argument
  }

  public function store(Request $request) {

    // + way 1
    $pizza = new Pizza();
    $pizza->name = $request->input('name', 'unknown name');
    $pizza->type = $request->input('type');
    $pizza->base = $request->input('base');
    $pizza->toppings = $request->input('toppings'); // without argument input() will return all in form of an associative array
    $pizza->save();

    // + way 2 (add "protected $guarded = [];" or "protected $fillable = ['name', 'type', etc.];" to Pizza model to make all the properties fillable to do this way, this way is less secure)
//    Pizza::create([
//      'name' => request('name'),
//      'type' => request('type'),
//      'base' => request('base'),
//      'toppings' => request('toppings'),
//    ]);
    $request->flash(); // flashed data can be retrieve using $request->old() ( or old() in view)
    return redirect('/')->with('message', 'Thank you for ordering our pizza'); // we all so cab pass data using with() (e.g., with('posts', $post)
  }

  public function destroy(Request $request, $id) {
    try {
      $pizza = Pizza::findOrFail($id);
      $pizza->delete();
      return redirect('/pizzas')->with('message', 'delete order successfully.');
    } catch (ModelNotFoundException $e) {
      error_log($e->getMessage());
      return back()->with('error', 'ID: ' . $id . ' not found');
    } catch (Exception $e) {
      error_log($e->getMessage());
      return back()->with('error', 'Failed to delete order.');
    }
  }
}
// * use withinput() after with() to go back with old data. In view retrieve old data with old() (e.g.,  {{ old('username') }} ).
