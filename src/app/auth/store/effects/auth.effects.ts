import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// NgRX Imports
import { Actions, Effect, ofType } from '@ngrx/effects';
// RxJS Imports
import { Observable, from } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
// Auth Actions imports
import {
  AuthActionTypes,
  LoggedIn,
  LogOut,
  LoggedUser,
  LoginUser,
  LoginUserError
} from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';


@Injectable({providedIn: 'root'})
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private authService: AuthService) { }

  @Effect()
  loginUserError$: Observable<any> = this.actions$.pipe(
    ofType<LoginUserError>(AuthActionTypes.LoginUserError),
    tap(x => console.log('LoggedAPI error', x.payload ),
    map(res => {
      return { type: 'LOGIN_API_ERROR', payload: 'Email or password incorrect' };
    })
    )
  );

  @Effect()
  loginUser$: Observable<any> = this.actions$.pipe(
    ofType<LoginUser>(AuthActionTypes.LoginUser),
    tap(v => console.log('LoginUser effect', v),
    map((res: any) => {
      this.authService.login({
        username: '',
        email: res.payload.user,
        password: res.payload.pass
      });
    })
    )
  );

  @Effect()
  LoggedUser$: Observable<any> = this.actions$.pipe(
    ofType<LoginUserError>(AuthActionTypes.LoginUserError),
    tap(v => console.log('LoggedUser payload', v.payload ),
    map(res => {
      return { type: '', payload: res };
    })
    )
  );
}
