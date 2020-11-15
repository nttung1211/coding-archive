@extends('layouts.app')

@section('content')
  <div class='wrapper create-pizza'>
    <h1>Create a new pizza</h1>
    <form action='/pizzas' method='post'>
      @csrf
      <label for='name'>Name:</label>
      <input type='text' name='name' id='name'>

      <label for='type'>Type:</label>
      <select name='type' id='type'>
        <option value='french'>French</option>
        <option value='italy'>Italy</option>
        <option value='vietnam'>Vietnam</option>
      </select>

      <label for='base'>Base: </label>
      <select name='base' id='base'>
        <option value='thick'>Thick</option>
        <option value='thin'>Thin</option>
        <option value='crispy'>Crispy</option>
      </select>

      <fieldset>
        <legend>Extra toppings:</legend>
        <label>
          <input type='checkbox' name='toppings[]' value='mushroom'>
          Mushroom
        </label>
        <label>
          <input type='checkbox' name='toppings[]' value='garlic'>
          Garlic
        </label>
        <label>
          <input type='checkbox' name='toppings[]' value='potato'>
          Potato
        </label>
      </fieldset>

      <input type='submit' name='orderPizza' value='Order'>
    </form>
  </div>
@endsection
