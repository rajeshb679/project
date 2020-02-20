import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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

    @Effect({ dispatch: false }) // no actions to dispatch at the end
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
