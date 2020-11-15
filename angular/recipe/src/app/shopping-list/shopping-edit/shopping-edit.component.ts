import { Component, OnInit } from '@angular/core';

import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
  }

  onAddIngredient(name: string, amount: number) {
    this.ingredientService.add({
      name,
      amount
    })
  }
}
