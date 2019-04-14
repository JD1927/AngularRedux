import { Action } from '@ngrx/store';
import { IUser } from 'src/app/shared/interfaces/user.model';

export enum AuthActionsType  {
  LoggedUser = '[Auth] LOGGED_USER',
  LoginUser = '[Auth] LOGIN_USER',
  LoginUserError = '[Auth] LOGIN_USER_ERROR',
  LoggedIn = '[Auth] LOGGED_IN',
  LogOut = '[Auth] LOG_OUT',
}


export const loggedUser = '[Auth] LOGGED_USER';
export const loginUser = '[Auth] LOGIN_USER';
export const loginUserError = '[Auth] LOGIN_USER_ERROR';
export const loggedIn = '[Auth] LOGGED_IN';
export const logOut = '[Auth] LOG_OUT';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoggedIn implements Action {
  readonly type = loggedIn;

  constructor(public payload: { isLogin: boolean }) { }
}

export class LogOut implements Action {
  readonly type = logOut;

  constructor(public payload: { isLogout: boolean }) { }
}
export class LoggedUser implements Action {
  readonly type = loggedUser;

  constructor(public payload: { isLoading: boolean, error: boolean, user: IUser }) { }
}

export class LoginUserError implements Action {
  readonly type = loginUserError;

  constructor(public payload: { error: string }) { }
}
export class LoginUser implements Action {
  readonly type = loginUser;

  constructor(public payload: { user: IUser }) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type actions = LoggedIn | LogOut | LoggedUser | LoginUserError | LoginUser;
