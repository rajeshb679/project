import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpsWcBX1Jb4Gin0kwbmGePQjCcswVMigA',
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
    }
}
