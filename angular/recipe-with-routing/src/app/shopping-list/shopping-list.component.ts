import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientService } from './ingredient.service';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private ingredientService: IngredientService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngredients();
    
    this.subscription = this.ingredientService.ingredientsChanged.subscribe(() => {
      this.ingredients = this.ingredientService.getIngredients();
    });
  }

  onEditIngredient(index: number) {
    this.ingredientService.ingredientEdited.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
