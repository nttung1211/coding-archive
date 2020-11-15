import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AuthComponent } from './auth.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([ 
      /* self: 
      - when we put RouterModule here we instanciate it then we have an router module object
      - then we run forchild() with an argument passed in (the routes objects) to have a new router module configured object that replaces the latter one to use.
      - Or by putting the name of the class RouterModule in the exports we export that configured router module object.
      */
      {
        path: '',
        component: AuthComponent
      }
    ])
  ]
})
export class AuthModule { }

