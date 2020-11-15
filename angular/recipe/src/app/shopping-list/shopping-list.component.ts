import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientService } from './ingredient.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private ingredientService: IngredientService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngredient();
    
    this.ingredientService.ingredientsChanged.subscribe(() => {
      this.ingredients = this.ingredientService.getIngredient();
    });
  }
}
