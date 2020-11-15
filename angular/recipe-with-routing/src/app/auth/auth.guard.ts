import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      // Approach 1: return boolean to permit go to recipes then manually navigate to wishing path
      // map(
      //   user => !!user
      // ),
      // tap(
      //   isAuth => {
      //     if (!isAuth) {
      //       this.router.navigate(['/auth']);
      //     }
      //   }
      // )

      // Approach 2: return a urltree observable will navigate to that url when not true
      take(1),
      map(
        user => user ? true : this.router.createUrlTree(['/auth'])
      )
    );
  }
}