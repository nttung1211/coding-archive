import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: Recipe[] = [
    // new Recipe(
    //   1,
    //   'pizza',
    //   'a recipe from italy',
    //   'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg',
    //   [
    //     {
    //       name: 'egg',
    //       amount: 2
    //     },
    //     {
    //       name: 'apple',
    //       amount: 2
    //     }
    //   ]
    //  ),
    // new Recipe(
    //   2,
    //   'Burger', 
    //   'a recipe from America', 
    //   'https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg',
    //   [
    //     new Ingredient('banana', 2),
    //     new Ingredient('pork', 1)
    //   ]
    //   )
  ];

  recipesChanged = new Subject();

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next();
  }

  getRecipes() {
    return this.recipes.slice(); // make a copy of recipes to not change the array since without slice it will return a reference
  }

  getRecipe(id: number) {
    return [...this.recipes].find(rec => rec.id === id);
  }

  update(id: number, newRecipe: Recipe) {
    let index = this.recipes.findIndex(rec => rec.id === id);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next();
  }

  add(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next();
    // console.log(this.recipes);
  }

  delete(id: number) {
    let index = this.recipes.findIndex(rec => rec.id === id);
    this.recipes.splice(index, 1);
    this.recipesChanged.next();
  } 

  clear() {
    this.recipes = [];
    this.recipesChanged.next();
  }

  generateID() {
    let id = Math.ceil(Math.random() * 99);
    if (this.recipes.find(rec => rec.id === id)) {
      return this.generateID();
    }

    return id;
  }

}