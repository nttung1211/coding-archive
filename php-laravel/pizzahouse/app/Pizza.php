<?php

namespace App;

use Eloquent;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Pizza
 *
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $type
 * @property string $base
 * @property string $name
 * @property array|Application|mixed|string toppings
 * @method static Builder|Pizza newModelQuery()
 * @method static Builder|Pizza newQuery()
 * @method static Builder|Pizza query()
 * @method static Builder|Pizza whereBase($value)
 * @method static Builder|Pizza whereCreatedAt($value)
 * @method static Builder|Pizza whereId($value)
 * @method static Builder|Pizza whereName($value)
 * @method static Builder|Pizza whereType($value)
 * @method static Builder|Pizza whereUpdatedAt($value)
 * @mixin Eloquent
 */
class Pizza extends Model
{
  protected $table = 'pizzas'; // this is automatically done
  protected $casts = [
    'toppings' => 'array'
  ];
// * for array casting, data will be serialize into json and vice versa automatically
// https://laravel.com/docs/7.x/eloquent-mutators#array-and-json-casting

  // ACCESSOR
  public function getTypeAttribute($value) {
    return ucfirst($value);
  }

  public function getTypeAndBaseAttribute() // this will add a 'type_and_base' attribute to this model that we can use it just like other attribute (e.g., $pizza->type_and_base).
  {
    return ucfirst($this->type) . $this->base;
  }

  // MUTATOR
//https://laravel.com/docs/7.x/eloquent-mutators
}
