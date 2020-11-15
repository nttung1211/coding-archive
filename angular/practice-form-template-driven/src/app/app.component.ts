import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('formObj') formObj: NgForm;
  subscriptions = [
    'basic',
    'advanced',
    'pro'
  ];
  user = {
    email: '',
    password: '',
    subscription: ''
  }

  onSubmit() {
    if (this.formObj.valid) {
      console.log(this.formObj);
      this.user.email = this.formObj.value.email;
      this.user.password = this.formObj.value.password;
      this.user.subscription = this.formObj.value.subscription;
      console.log(this.user);
      this.formObj.reset();
    } else {
      console.log('invalid input');
    }
  }
}
