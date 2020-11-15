import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full' // we need to specify this since the default redirecTo's strategy is prefix but every path has '' 
  },

  // * using lazy loading:
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module')
      .then(module => module.RecipesModule) // everything in this module will be put into a separate bundle
  },

  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module')
      .then(module => module.ShoppingListModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }) // we can also customize this
  ],
  exports: [
    RouterModule
  ] 
})
export class AppRoutingModule {}