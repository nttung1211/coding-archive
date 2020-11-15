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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  
  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']) ;
      }
    );
  }
  
  onSendToSL() {
    this.recipe.ingredients.forEach(ingredient => {
      this.ingredientService.add(ingredient);
    })
  }

  onDelete() {
    this.recipeService.delete(this.recipe.id);
    this.router.navigate(['/recipes']);
  }

}