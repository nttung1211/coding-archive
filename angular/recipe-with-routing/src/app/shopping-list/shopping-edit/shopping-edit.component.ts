import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { IngredientService } from '../ingredient.service';
import { NgForm, NgModel } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  @ViewChild('nameEle') nameEle: ElementRef;
  // @ViewChild('inpName') inpName: NgModel;
  ingredientIndex: number;
  edittedIngredient: Ingredient;
  editMode: boolean;
  private editModeSwitchedSubscription: Subscription;
  private ingredientEditedSubscription: Subscription;

  constructor(public ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.editModeSwitchedSubscription = this.ingredientService.editModeSwitched.subscribe(
      () => {
        this.editMode = this.ingredientService.isInEditMode();
      }
    );

    this.ingredientEditedSubscription = this.ingredientService.ingredientEdited.subscribe(
      (index: number) => {
        this.ingredientIndex = index;
        this.edittedIngredient = this.ingredientService.getIngredient(index);
        this.form.form.patchValue({
          'name': this.edittedIngredient.name,
          'amount': this.edittedIngredient.amount
        });
        this.ingredientService.turnOnEditMode();
        this.nameEle.nativeElement.select();
      }
    )
  }

  ngOnDestroy() {
    this.editModeSwitchedSubscription.unsubscribe();
    this.ingredientEditedSubscription.unsubscribe();
  }

  onSubmit() {
    // this.form.getControl(this.inpName).invalid
    let newIngredient = new Ingredient(this.form.value.name, this.form.value.amount)
    if (this.form.invalid) return;
    if (this.editMode) {
      this.ingredientService.update(this.ingredientIndex, newIngredient);
    } else {
      this.ingredientService.add(newIngredient);
    }

    this.resetFields();
  }

  onDelete() {
    // if (this.ingredientIndex == null) return; 
    this.ingredientService.delete(this.ingredientIndex);
    this.resetFields();
  }

  onClear() {
    this.resetFields();
  }
  
  resetFields() {
    // this.form.reset({
      //   'amount': 1
      // })
    this.form.resetForm({
      'amount': 1
    });
      
    this.nameEle.nativeElement.focus();
    this.ingredientService.turnOffEditMode();
    // console.log(this.form);
  }

  // onAddIngredient(name: string, amount: number) {
  //   this.ingredientService.add({
  //     name,
  //     amount
  //   })
  // }
}
