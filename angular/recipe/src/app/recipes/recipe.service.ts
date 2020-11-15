import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'pizza',
      'a recipe from italy',
      'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg',
      [
        {
          name: 'egg',
          amount: 2
        },
        {
          name: 'apple',
          amount: 2
        }
      ]
     ),
    new Recipe(
      'Burger', 
      'a recipe from America', 
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg',
      [
        new Ingredient('banana', 2),
        new Ingredient('pork', 1)
      ]
      )
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice(); // make a copy of recipes to not change the array since without slice it will return a reference
  }
}