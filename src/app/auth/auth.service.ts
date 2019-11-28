import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

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
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    private tokenExpiationTimer: any;
    constructor(private http: HttpClient, private router: Router) {}

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

    autoLogin(): void {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.autoLogout(expirationDate);
        }
    }

    logout(): void {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpiationTimer) {
            clearTimeout(this.tokenExpiationTimer);
        }
        this.tokenExpiationTimer = null;
    }

    autoLogout(expirationTime: number): void {
        this.tokenExpiationTimer = setTimeout(() => {
            this.logout();
        }, expirationTime);
    }

    private handleAuth(email: string, id: string, token: string, expies: number): any {
        const expireData = new Date(new Date().getTime() + +expies * 1000);
        const user = new User(email, id, token, expireData);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expies * 1000);
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
