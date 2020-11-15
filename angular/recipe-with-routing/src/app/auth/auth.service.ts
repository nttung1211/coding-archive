import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RecipeService } from '../recipes/recipe.service';

export interface AuthResponse {
  kind?: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(null);
  /* 
  - Subject:
    -- The subscriber will receive data whenever subject emit data by next()
    -- If we want data at a specific time we would need to store that data whenever we receive it
  - behaviorSubject :
    -- The subscriber will receive data whenever subject emit data by next()
    -- We can proactively receive date whenever we want since it always saves the latest data it emitted
    -- Besides, we can set an inital value for a behaviorSubject
  - We can't use subject here because we would subscribe it in a service (auth.guard) where we can't use ngOnInit() (since ngOnInit() just works in components and directives) to get the data at the beginning and store to use when needed.
  */

  private logoutTimer: any;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private router: Router  ) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleResponse.bind(this))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleResponse.bind(this))
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate) // because this is a string after parsing
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const duaration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(duaration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['auth']); // we can't go to /recipes/** or / (since / is redirected to /recipes) because it is still counted that you still stay in /recipes then guard will not be triggered 
    this.recipeService.setRecipes([]);
    localStorage.removeItem('userData');

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  autoLogout(duaration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, duaration);
  }

  private handleResponse(response: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(+response.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    let errMes = 'An unknow error has occurred.';

    if (!error.error || !error.error.error) {
      return throwError(errMes);
    }

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errMes = 'This email has been taken.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errMes = 'Incorrect email or password.';
        break;
    }

    return throwError(errMes);
  }
}