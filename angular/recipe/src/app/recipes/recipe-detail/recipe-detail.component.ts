// import { Component, OnInit, Input } from '@angular/core';
// import { Recipe } from '../recipe.model';

// @Component({
//   selector: 'app-recipe-detail',
//   templateUrl: './recipe-detail.component.html',
//   styleUrls: ['./recipe-detail.component.css']
// })
// export class RecipeDetailComponent implements OnInit {

//   @Input('thisCurrentRecipe') currentRecipe: Recipe; 
//   // isOpen = false;

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

/* AFTER ADD SERVICE */
import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { IngredientService } from 'src/app/shopping-list/ingredient.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((selectedRecipe: Recipe) => {
    //   console.log(this.selectedRecipe)
    //   this.selectedRecipe = selectedRecipe;
    // })
    /* we can not do this way because the app.ts will listen to the event first and then render this component before this component listens to the event and update this.selectedRecipe, hence it will be undefined at first and delayed a turn later*/
    /* we should not listen to an event from many different components which work dependently to each other */
  }
  
  onSendToSL() {
    this.selectedRecipe.ingredients.forEach(ingredient => {
      this.ingredientService.add(ingredient);
    })
  }

}