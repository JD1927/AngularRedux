import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// NgRX Imports
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../app-store/reducers/reducers';
import * as authActions from '../store/actions/auth.actions';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GoogleLogin } from '../store/actions/auth.actions';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: IUser;
  // userForm: FormGroup;
  isLoading$: Subscription = new Subscription();
  isLoading: boolean;
  error$: Subscription = new Subscription();
  error: string;
  user$: Subscription = new Subscription();
  userName: string;


  constructor(
    private fb: FormBuilder,
    private store: Store<fromAuth.AppState>,
    private authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.store.dispatch(new authActions.GetUser());
    this.getLoading();
    this.getError();
    this.getUser();
  }

  ngOnDestroy() {
    this.isLoading$.unsubscribe();
    this.error$.unsubscribe();
    this.user$.unsubscribe();
  }

  getLoading() {
    this.isLoading$ = this.store.select(fromAuth.getAuthLoading)
      .subscribe(
        (res) => {
          this.isLoading = res;
        },
        (err) => alert(err)
      );
  }

  getError() {
    this.error$ = this.store.select(fromAuth.getAuthError)
      .subscribe(
        (res) => {
          this.error = res;
        },
        (err) => this.alertService.openAlertModalMessage('Error', err)
      );
  }

  getUser() {
    this.user$ = this.store.select(fromAuth.getAuth)
      .subscribe(
        (res) => {
          this.user = res;
        },
        (err) => this.alertService.openAlertModalMessage('Error', err)
      );
  }

  signIn(): void {
    this.authService.signInGoogle();
  }

  logOut() {
    this.authService.signOutGoogle();
  }

}
