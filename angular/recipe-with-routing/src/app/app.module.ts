import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule, // this must only be imported once here, for other we import commonModule instead
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, // this just provide services hence we only need to import here in the app module

    CoreModule,
    SharedModule,
    
    // AuthModule
    // RecipesModule, // when we load a module lazily we dont need to import the module here
    // ShoppingListModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

