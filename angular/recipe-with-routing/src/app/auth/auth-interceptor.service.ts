import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(
        user => {
          if (user) {
            let modifiedRequest = request.clone({
              params: new HttpParams().set('auth', user.token)
            });

            return handler.handle(modifiedRequest);
          }

          return handler.handle(request);
        }
      )
    )
  }
}