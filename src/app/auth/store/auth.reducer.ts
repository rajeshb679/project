import { User } from '../user.model';
// import { AuthActions } from './auth.actions';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null,
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
            return { ...state, user };
        case AuthActions.LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
    return state;
}
