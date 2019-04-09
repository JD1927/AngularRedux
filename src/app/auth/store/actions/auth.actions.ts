import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AuthActionTypes {
  LoggedUser = '[Auth] LOGGED_USER',
  LoginUser = '[Auth] LOGIN_USER',
  LoginUserError = '[Auth] LOGIN_USER_ERROR',
  LoggedIn = '[Auth] LOGGED_IN',
  LogOut = '[Auth] LOG_OUT'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoggedIn implements Action {
  readonly type = AuthActionTypes.LoggedIn;

  constructor(public payload: { isLogin: boolean }) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LogOut;

  constructor(public payload: { isLogin: boolean }) { }
}
export class LoggedUser implements Action {
  readonly type = AuthActionTypes.LoggedUser;

  constructor(public payload: any) { }
}

export class LoginUserError implements Action {
  readonly type = AuthActionTypes.LoginUserError;

  constructor(public payload: { error: string }) { }
}
export class LoginUser implements Action {
  readonly type = AuthActionTypes.LoginUser;

  constructor(public payload: { user: string, pass: string }) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type actions= LoggedIn | LogOut | LoggedUser | LoginUserError | LoginUser;
