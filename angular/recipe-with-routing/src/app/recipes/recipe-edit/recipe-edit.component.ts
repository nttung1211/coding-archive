import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;
  @ViewChild('ingWrapper') inWrapper: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.recipeId = +params['id'];
          this.editMode = true;
        }

        this.initForm();
      }
    )
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(
                ingredient.amount, 
                [
                  Validators.required, 
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]
              )
            })
          )
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'imagePath': new FormControl(imagePath, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients
    });
  }

  onAddIng() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(
          null, 
          [
            Validators.required, 
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
        )
      })
    )
      setTimeout(() => {
        this.inWrapper.nativeElement.querySelector('.lastIng input').focus();
      });
  }

  onDelIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onDelAllIng() {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onSubmit() {
    if (this.recipeForm.invalid) return;
    console.log(this.recipeForm);

    // let ingredients = this.recipeForm.get('ingredients')['controls']
    // .map(formGroup => {
    //   return { 
    //     'name': formGroup.get('name').value,
    //     'amount': formGroup.get('amount').value
    //   }
    // });

    if (this.editMode) {
      // let newRecipe = new Recipe(
      //   this.recipeId,
      //   this.recipeForm.value['name'],
      //   this.recipeForm.value['description'],
      //   this.recipeForm.value['imagePath'],
      //   ingredients
      // );

      this.recipeService.update(this.recipeId, { id: this.recipeId, ...this.recipeForm.value });

    } else {
      this.recipeId = this.recipeService.generateID();
      this.recipeService.add({ id: this.recipeId, ...this.recipeForm.value });
    }
    
    this.router.navigate(['/recipes', this.recipeId]);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onDelete() {
    this.recipeService.delete(this.recipeId);
    this.router.navigate(['/recipes']);
  }

}

