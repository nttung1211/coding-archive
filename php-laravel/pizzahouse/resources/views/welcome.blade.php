@extends('layouts.layout')

@section('content')
  <div class="flex-center position-ref full-height">
    @if (Route::has('login'))
      <div class="top-right links">
        @auth
          <a href="{{ url('/home') }}">Home</a>
        @else
          <a href="{{ route('login') }}">Login</a>

          @if (Route::has('register'))
            <a href="{{ route('register') }}">Register</a>
          @endif
        @endauth
      </div>
    @endif

    <div class="content">
      <img src='img/mountain.jpg' alt='' width='500px'>
      <p class='message'>{{ session('message') }}</p>
      <a href='{{ route('pizzas.create') }}'>Order a pizza</a>
    </div>
  </div>
@endsection
