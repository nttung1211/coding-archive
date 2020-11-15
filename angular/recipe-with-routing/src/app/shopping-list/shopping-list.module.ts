import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule, // we don't import browseModule since it need to be imported only once, in other modules we import commonModule instead to be able to use features like ngIf, ngFor ...
    FormsModule,
    ReactiveFormsModule,
    ShoppingListRoutingModule
    // since this just has one route we can import directly like the following instead of having separate routing module.
    // RouterModule.forChild([
    //   {
    //     path: 'shopping-list',
    //     component: ShoppingListComponent
    //   }
    // ])
  ]
})
export class ShoppingListModule {}