import { Action } from '@ngrx/store';
import { User } from '../../models/user';

// Auth ACTIONS
export const GET_USER = '[Auth] GET USER';
export const AUTHENTICATED = '[Auth] AUTHENTICATED';
export const NOT_AUTHENTICATED = '[Auth] NOT AUTHENTICATED';
export const GOOGLE_LOGIN = '[Auth] GOOGLE LOGIN ATTEMPT';
export const LOG_OUT = '[Auth] LOG OUT';
export const AUTH_ERROR = '[Auth] AUTH ERROR';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) { }
}
export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload?: any) { }
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
  constructor(public payload?: any) { }
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) { }
}

export type all = GetUser
| Authenticated
| NotAuthenticated
| GoogleLogin
| LogOut
| AuthError;
