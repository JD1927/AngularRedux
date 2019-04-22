import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../app-store/reducers/reducers';
import * as authActions from '../store/actions/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<fromAuth.AppState>) { }

  signInGoogle(): void {
    this.store.dispatch(new authActions.GoogleLogin());
  }

  signOutGoogle(): void {
    this.store.dispatch(new authActions.LogOut());
  }

  getUser(): Observable<any> {
    return this.store.select(fromAuth.getAuth);
  }

}
