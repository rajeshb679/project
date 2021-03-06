import { User } from '../user.model';
// import { AuthActions } from './auth.actions';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.payLoad.email,
                action.payLoad.userId,
                action.payLoad.token,
                action.payLoad.expirationDate
            );
            // return { ...state, user: user };
            // if variable name and property name are same we can use like below
            return { ...state, user, authError: null, loading: false };
        case AuthActions.LOGOUT:
            return { ...state, user: null };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP:
            return { ...state, user: null, loading: true, authError: null };
        case AuthActions.LOGIN_FAIL:
            return { ...state, user: null, authError: action.payLoad.authError, loading: false };
        case AuthActions.CLEAR_ERROR:
            return { ...state, authError: null };
        default:
            return state;
    }
    return state;
}
