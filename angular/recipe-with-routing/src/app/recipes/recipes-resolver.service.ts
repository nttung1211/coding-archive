import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes; // this method must return Recipe[], promise<Recipe[]> or observable<recipe> since we declared the generic type is Recipe[]
    }
    // we can extract this return value from the route we are going to. In this case we don't have any purpose of doing so
    /* example:
        this.activatedRoute.data.subscribe(
         (data: Data) => {
            this.server = data['server'];
          }
        );  
    */
  }
}