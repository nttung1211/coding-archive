import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,18}$')])
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.valid) {
      const value = this.authForm.value;
      this.isLoading = true;

      let authObservable: Observable<AuthResponse>;

      if (this.isLoginMode) {
        authObservable = this.authService.login(value.email, value.password);
      } else {
        authObservable = this.authService.signUp(value.email, value.password);
      }

      authObservable.subscribe(
        response => {
          this.isLoading = false;
          this.error = null;
          this.authForm.reset();
          this.router.navigate(['/recipes']);
        },
        error => {
          this.isLoading = false;
          this.error = error;
        }
      );
    }
  }


}
