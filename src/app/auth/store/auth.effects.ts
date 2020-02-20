import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP),
        switchMap((signupAction: AuthActions.SignUp) => {
            return this.http
                .post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseKey,
                    {
                        email: signupAction.payLoad.email,
                        password: signupAction.payLoad.password,
                        returnSecureToken: true,
                    }
                )
                .pipe(
                    map(resData => {
                        const expireData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        const user = new User(resData.email, resData.idToken, resData.refreshToken, expireData);
                        localStorage.setItem('userData', JSON.stringify(user));
                        return new AuthActions.Login({
                            email: resData.email,
                            token: resData.idToken,
                            userId: resData.localId,
                            expirationDate: expireData,
                        });
                    }),
                    catchError(errorRes => {
                        let errorMessage = 'An error ocurred';
                        console.log(errorRes);
                        if (!errorRes.error || !errorRes.error.error) {
                            return of(new AuthActions.LoginFail({ authError: errorMessage }));
                        }
                        switch (errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'Email already exists';
                                break;
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'Email Not Found';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'Invalid Password Entered';
                                break;
                        }
                        return of(new AuthActions.LoginFail({ authError: errorMessage }));
                    })
                );
        })
    );
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpsWcBX1Jb4Gin0kwbmGePQjCcswVMigA',
                    {
                        email: authData.payLoad.email,
                        password: authData.payLoad.password,
                        returnSecureToken: true,
                    }
                )
                .pipe(
                    map(resData => {
                        const expireData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        const user = new User(resData.email, resData.idToken, resData.refreshToken, expireData);
                        localStorage.setItem('userData', JSON.stringify(user));
                        return new AuthActions.Login({
                            email: resData.email,
                            token: resData.idToken,
                            userId: resData.localId,
                            expirationDate: expireData,
                        });
                    }),
                    catchError(errorRes => {
                        let errorMessage = 'An error ocurred';
                        console.log(errorRes);
                        if (!errorRes.error || !errorRes.error.error) {
                            return of(new AuthActions.LoginFail({ authError: errorMessage }));
                        }
                        switch (errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'Email already exists';
                                break;
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'Email Not Found';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'Invalid Password Entered';
                                break;
                        }
                        return of(new AuthActions.LoginFail({ authError: errorMessage }));
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
        })
    );

    @Effect({ dispatch: false }) // no actions to dispatch at the end
    authRedirect = this.actions$.pipe(
        tap(console.log),
        ofType(AuthActions.LOGIN, AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (loadedUser.token) {
                // this.user.next(loadedUser);
                return new AuthActions.Login({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                });

                // const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

                // this.autoLogout(expirationDate);
            }
            return { type: 'DUMMY' };
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
