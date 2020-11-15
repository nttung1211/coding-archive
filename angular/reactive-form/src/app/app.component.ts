import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signUpForm: FormGroup;
  forbiddenNames = ['fuck', 'asshole'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbidNames.bind(this)]),// be carefull!!! when we pass a function as a callback because the this will not be what it is being
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbidEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([
        new FormControl(null, Validators.required), 
        new FormControl(null, Validators.required)
      ])
    });

    // this.signUpForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );

    this.signUpForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );

    this.signUpForm.setValue({
      'userData': {
        'username': 'John',
        'email': 'john@gmail.com',
      },
      'gender': 'male',
      'hobbies': ['soccer', 'tennis']
    });

    this.signUpForm.patchValue({
      'userData': {
        'username': 'Johnny'
      }
    });
  }

  onSubmit() {
    console.log({ ...this.signUpForm }); // if we do not take a copy of the object like this, its value will be updated and rendered the moment we expand the object on the console since the console just keep the reference of the object
    console.log(this.signUpForm);

    this.signUpForm.reset({
      'gender': 'male',
    });
  }

  onAddHobby() {
    let control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  forbidNames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenNames.includes(control.value)) {
      return { nameIsForbidden: true };
    } else {
      return;
    }
  }

  forbidEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'fuck@gmail.com') {
            resolve({ emailIsForbidden: true });
          } else {
            resolve(null);
          }
        }, 1000);
      }
    );

    return promise;
  }
}
