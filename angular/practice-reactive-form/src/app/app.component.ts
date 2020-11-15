import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  statusTypes = ['stable', 'critical', 'finished'];

  ngOnInit() {
    this.myForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], [CustomValidators.asyncForbidName]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('stable')
    });
  }

  onSubmit() {
    console.log(this.myForm);
  }
}
