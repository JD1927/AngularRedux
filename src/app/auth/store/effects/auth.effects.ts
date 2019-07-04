import { Injectable } from '@angular/core';

// NgRX Imports
import { Actions, Effect, ofType } from '@ngrx/effects';
// RxJS Imports
import { Observable, from, of } from 'rxjs';
import { tap, map, mergeMap, exhaustMap, catchError, switchMap, delay } from 'rxjs/operators';
// Auth Actions imports
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user';
import * as firebase from 'firebase/app';

export type Action = AuthActions.all;

@Injectable()
export class AuthEffects {
  constructor(
    private afAuth: AngularFireAuth,
    private actions$: Actions,
    private router: Router) { }

  @Effect()
  getUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.GET_USER),
    map((action: AuthActions.GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState),
    delay(1000), // Solo para el spinner
    map(authData => {
      if (authData) {
        const user = new User(authData.uid, authData.displayName, authData.photoURL, authData.email);
        return new AuthActions.Authenticated(user);
      } else {
        return new AuthActions.NotAuthenticated();
      }
    }),
    catchError((err) => of(new AuthActions.AuthError(err)))
  );

  @Effect({ dispatch: false })
  Authenticated$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATED),
    map((action: AuthActions.Authenticated) => {
      this.router.navigate(['/dashboard']);
    })
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.GOOGLE_LOGIN),
    map((action: AuthActions.GoogleLogin) => action.payload),
    switchMap(payload => {
      return from(this.googleLogin());
    }),
    map(credential => {
      return new AuthActions.GetUser();
    }),
    catchError(err => of(new AuthActions.AuthError({ error: err.message })))
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.LOG_OUT),
    map((action: AuthActions.LogOut) => action.payload),
    switchMap(payload => {
      return of(this.afAuth.auth.signOut());
    }),
    map(authData => {
      this.router.navigate(['']);
    }),
    catchError(err => of(new AuthActions.AuthError({ error: err.message })))
  );
  private googleLogin(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

}
