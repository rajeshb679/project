import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAIL = '[Auth] Login Fail';

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

// ? can't i implete a inteface
// ? you can but can't initialize the data using constructor..... - Verify
export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payLoad: { email: string; userId: string; token: string; expirationDate: Date }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payLoad: { email: string; password: string }) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payLoad: { authError: string }) {}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
