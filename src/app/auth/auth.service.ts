import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
            .pipe(catchError(this.handleError));
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
            .pipe(catchError(this.handleError));
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
