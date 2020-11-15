@extends('layouts.app')

@section('content')
  <div class='wrapper pizza-details'>
    <h3>{{ session('error') }}</h3>
    <h1>Order for: {{ $pizza->name }}</h1>
    <p class='type'>Type - {{ $pizza->type }}</p>
    <p class='base'>Base - {{ $pizza->base }}</p>
    <p class='toppings'>Extra toppings:</p>
    <ul>
      @foreach($pizza->toppings as $top)
        <li>{{ $top }}</li>
      @endforeach
    </ul>
    <form action='{{ route('pizzas.destroy',  1) }}' method='post'>
      @csrf
      @method('delete')
      <button>Complete order</button>
    </form>
    <a href='{{ route('pizzas.index') }}'><- Back</a>
  </div>
@endsection
