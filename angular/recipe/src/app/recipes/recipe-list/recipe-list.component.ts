// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { Recipe } from '../recipe.model';

// @Component({
//   selector: 'app-recipe-list',
//   templateUrl: './recipe-list.component.html',
//   styleUrls: ['./recipe-list.component.css']
// })
// export class RecipeListComponent implements OnInit {
//   private recipes: Recipe[] = [
//     new Recipe(
//       'pizza',
//       'a recipe from italy',
//       'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg'
//      ),
//     new Recipe(
//       'Burger', 
//       'a recipe from America', 
//       'https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg'
//       )
//   ];

//   @Output() subRecipeSelected = new EventEmitter<Recipe>();

//   constructor() { }

//   onRecipeSelected(event: Recipe) {
//     this.subRecipeSelected.emit(event);
//   }

//   ngOnInit(): void { }
// }


/* AFTER HAVE SERVICE */
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes =  this.recipeService.getRecipes();
  }
}
