import * as AuthActions from '../actions/auth.actions';
import { User } from '../../models/user';

export type Action = AuthActions.all;

const defaultUser = new User(null, 'GUEST');

export function AuthReducer(state: User = defaultUser, action: Action) {
  switch (action.type) {
    case AuthActions.GET_USER:
      return { ...state, loading: true };
    case AuthActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };
    case AuthActions.NOT_AUTHENTICATED:
      return { ...state, ...defaultUser, loading: false };
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

