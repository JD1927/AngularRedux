import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// NgRX Imports
import { Actions, Effect, ofType } from '@ngrx/effects';
// RxJS Imports
import { Observable, from, of } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError, switchMap } from 'rxjs/operators';
// Auth Actions imports
import * as fromAuthActions from '../actions/auth.actions';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService) { }

  @Effect()
  loginUserError$ = this.actions$.pipe(
    ofType(fromAuthActions.loginUserError),
    map(res => {
      return { type: 'LOGIN_API_ERROR', payload: 'Se presentó un error' };
    })
  );

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType(fromAuthActions.loginUser),
    map((res: any) => res.payload),
    switchMap(auth => {
      return this.authService.login(auth.user).pipe(
        map(response => new fromAuthActions.LoggedUser(response)),
        catchError(error => of(new fromAuthActions.LoginUserError(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  LoggedUser$ = this.actions$.pipe(
    ofType(fromAuthActions.loggedUser),
    tap(x => this.router.navigate(['/chats']))
  );
}
