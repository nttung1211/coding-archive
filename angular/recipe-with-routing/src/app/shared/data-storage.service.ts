import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnInit {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  storeRecipes() {
    this.http
      .put<Recipe[]>(
        'https://recipe-30b1e.firebaseio.com/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
  }

  fetchRecipes() {
    // return this.authService.user.pipe(
    //   take(1), // subcribe only one time. By pipe through this we do not need to unsubcribe
    //   exhaustMap(
    //     user => {
    //       return this.http.get<Recipe[]>(
    //         'https://recipe-30b1e.firebaseio.com/recipes.json', 
    //         // we can add query parameters here instead ('...recipes.json?auth='+user.token)
    //         {
    //           params: new HttpParams().set('auth', user.token) // setting query parameters
    //         }
    //       );
    //     }
    //   ),
    return this.http
      .get<Recipe[]>('https://recipe-30b1e.firebaseio.com/recipes.json')
      .pipe(
        map(
          recipes => {
            return recipes.map(recipe => {
              return recipe.hasOwnProperty('ingredients') ? recipe : { ...recipe, ingredients: [] };
            });
          }
        ),
        // add  dummy ingredients so that we won't get error when send them to the shopping list
        tap(
          recipes => {
            console.log(recipes);
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }

}