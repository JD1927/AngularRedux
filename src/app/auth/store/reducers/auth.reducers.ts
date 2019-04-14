import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  user: Array<any>;
  tokens: Array<any>;
  error: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: AuthState = {
  user: [],
  tokens: [],
  error: false,
  isLoading: false
};

export function authReducer(state = [], action: AuthActions.actions) {
  switch (action.type) {
    case AuthActions.loginUser:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.loggedUser:
      return {
        ...state,
        isLoading: false,
        tokens: action.payload
      };
    case AuthActions.loginUserError:
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
        isLoading: false
      };
    default:
    return { ...state };
  }
}

export const getAuthState = (state: AuthState) => state.user;
export const getAuthAction = (action: any) => action.payload;
export const getAuthLoading = (state: any) => state.isLoading;
export const getAuthError = (state: AuthState) => state.error;
export const getAuthErrorMessage = (state: AuthState) => state.errorMessage;
