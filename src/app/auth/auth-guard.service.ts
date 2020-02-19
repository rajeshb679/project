import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        // return this.authService.user.pipe(
        return this.store.select('auth').pipe(
            take(1),
            tap(console.log),
            map(authState => {
                return authState.user;
            }),
            tap(console.log),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/login']);
            })
            // ,
            // tap(isAuth => {
            //     if (!isAuth) {
            //         this.router.navigate(['/login']);
            //     }
            // })
        );
    }
}
