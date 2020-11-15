// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import { Recipe } from '../../recipe.model';


// @Component({
//   selector: 'app-recipe-item',
//   templateUrl: './recipe-item.component.html',
//   styleUrls: ['./recipe-item.component.css']
// })
// export class RecipeItemComponent implements OnInit {

//   @Input('thisRecipe') recipe: Recipe;
//   @Output() recipeSelected = new EventEmitter<Recipe>();

//   emitRecipeSelected() {
//     this.recipeSelected.emit(this.recipe);
//   }

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

/* AFTER ADD SERVICE */
import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('thisRecipe') recipe: Recipe;

  constructor(private recipeSercive: RecipeService) { }

  
  ngOnInit(): void {
    
  }

}
