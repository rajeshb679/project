import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
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
            .pipe(
                catchError(errorRes => {
                    let errorMessage = 'An error ocurred';
                    console.log(errorRes);
                    if (!errorRes.error || !errorRes.error.error) {
                        errorMessage = 'Network Error';
                    }
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMessage = 'Email already exists';
                    }
                    return throwError(errorMessage);
                })
            );
    }
}
