import * as AuthActions from '../actions/auth.actions';
import { AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  user: Array<any>;
  tokens: Array<any>;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: [],
  tokens: [],
  error: '',
  isLoading: false
};

export function authReducer(state = [], action: AuthActions.actions) {
  switch (action.type) {
    case AuthActionTypes.LoginUser:
      return action;
    case AuthActionTypes.LoggedUser:
      return {
        ...state,
        isLoadig: false,
        tokens: action.payload
      };
    default:
    return state;
  }
}

export const getAuthState = (state: AuthState) => state.user;
export const getAuthAction = (action: any) => action.payload;
export const getAuthError = (state: AuthState) => state.error;
