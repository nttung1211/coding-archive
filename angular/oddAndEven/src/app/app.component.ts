import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elements = [];

  add(event: { value: number, isOdd: boolean }) {
    this.elements.push(event);
  }

  reset() {
    this.elements = [];
  }
} 
