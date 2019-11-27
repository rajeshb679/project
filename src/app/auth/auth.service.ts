import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new Subject<User>();
    constructor(private http: HttpClient) {}

    singUp(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpsWcBX1Jb4Gin0kwbmGePQjCcswVMigA',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((authResponse: AuthResponseData) => {
                    this.handleAuth(
                        authResponse.email,
                        authResponse.localId,
                        authResponse.idToken,
                        +authResponse.expiresIn
                    );
                })
            );
    }

    loginIn(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpsWcBX1Jb4Gin0kwbmGePQjCcswVMigA',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((authResponse: AuthResponseData) => {
                    this.handleAuth(
                        authResponse.email,
                        authResponse.localId,
                        authResponse.idToken,
                        +authResponse.expiresIn
                    );
                })
            );
    }

    private handleAuth(email: string, id: string, token: string, expies: number): any {
        const expireData = new Date(new Date().getTime() + +expies * 1000);
        const user = new User(email, id, token, expireData);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse): Observable<any> {
        let errorMessage = 'An error ocurred';
        console.log(errorRes);
        if (!errorRes.error || !errorRes.error.error) {
            errorMessage = 'Network Error';
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
        return throwError(errorMessage);
    }
}
