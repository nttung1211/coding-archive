@extends('layouts.app')

@section('content')
  <div class="flex-center position-ref full-height">

    <div class="content">
      <strong>{{ session('message') }}</strong>
      <h1>Index</h1>
      <table>
      @foreach ($pizzas as $piz)
        <tr>
          <td>{{$piz->name}}</td>
          <td>{{$piz->type}}</td>
          <td>{{$piz->base}}</td>
        </tr>
      @endforeach
      </table>
    </div>
  </div>
@endsection
