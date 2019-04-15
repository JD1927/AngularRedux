import * as AuthActions from '../actions/auth.actions';
import { User, IUser } from '../../models/user';

export type Action = AuthActions.all;

export interface AuthState {
  uid: string;
  displayName: string;
  loading?: boolean;
  photoURL?: string;
  email?: string;
  error?: string;
}

const initialState: AuthState = {
  uid: null,
  displayName: 'GUEST',
  error: '',
  loading: false,
  photoURL: '',
  email: ''
};

export function AuthReducer(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case AuthActions.GET_USER:
      return { ...state, loading: true };
    case AuthActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };
    case AuthActions.NOT_AUTHENTICATED:
      return { ...state, ...initialState, loading: false };
    case AuthActions.GOOGLE_LOGIN:
      return { ...state, loading: true };
    case AuthActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };
    case AuthActions.LOG_OUT:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
}

export const getAuthState = (state: AuthState) => state;
export const getAuthAction = (action: any) => action.payload;
export const getAuthError = (state: AuthState) => state.error;
export const getAuthLoading = (state: AuthState) => state.loading;
export const getAuthUser = (state: AuthState) => state.displayName;
export const getAuthPhotoURL = (state: AuthState) => state.photoURL;
export const getAuthEmail = (state: AuthState) => state.email;

