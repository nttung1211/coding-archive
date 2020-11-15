import { Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject();
  ingredientEdited = new Subject<number>();

  private editMode = false;
  editModeSwitched = new Subject();

  isInEditMode() {
    return this.editMode;
  }

  turnOffEditMode() {
    this.editMode = false;
    this.editModeSwitched.next();
  }

  turnOnEditMode() {
    this.editMode = true;
    this.editModeSwitched.next();
  }

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(index: number) {
    return this.ingredients.find((ing, i) => i === index);
  }

  add(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next();
  }

  update(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next();
  }

  delete(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next();
  }
}