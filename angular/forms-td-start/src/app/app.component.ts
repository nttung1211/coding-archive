import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usernameInp = '';
  @ViewChild('f', { static: true }) form: NgForm;
  answerValue: '';
  genders = ['male', 'female', 'gay'];
  user = {
    username: '',
    email: '',
    gender: '',
    secret: '',
    answer: ''
  }

  ngOnInit() {

  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    // approach 1:
    // this.usernameInp = suggestedName;

    //approach 2: 
    // - setValue: set the entire structure
    // this.form.setValue({
    //// this.form.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //     gender: 'male'
    //   },

    //   secret: 'pet',
    //   answer: '',
    // });
    // - limitation: when we click suggest again the entire structure will be overidden

    //approach 3:
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.form);

    if (this.form.valid) {
      this.user.username = this.form.value.userData.username;
      this.user.email = this.form.value.userData.email;
      this.user.gender = this.form.value.userData.gender;
      this.user.secret = this.form.value.secret;
      this.user.answer = this.form.value.answer;
      console.log(this.user);
      this.form.reset();
    } else {
      console.log('Please enter valid input');
    }
  }
}
