import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ControlComponent } from './control/control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';
import { NumComponent } from './num/num.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    OddComponent,
    EvenComponent,
    NumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
