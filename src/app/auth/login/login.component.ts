import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// NgRX Imports
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../app-store/reducers/reducers';
import { Subscription } from 'rxjs';
import { LoginUser } from '../store/actions/auth.actions';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: IUser;
  userForm: FormGroup;
  isLoading$: Subscription = new Subscription();
  isLoading: boolean;
  error$: Subscription = new Subscription();
  error: boolean;
  errorMessage$: Subscription = new Subscription();
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromAuth.AppState>,
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.createLoginForm();
    this.getLoading();
    this.getError();
    this.getErrorMessage();
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

  getErrorMessage() {
    this.errorMessage$ = this.store.select(fromAuth.getAuthErrorMessage)
      .subscribe(
        (res) => {
          this.errorMessage = res;
        },
        (err) => this.alertService.openAlertModalMessage('Error', err)
      );
  }

  ngOnDestroy() {
    this.isLoading$.unsubscribe();
    this.error$.unsubscribe();
    this.errorMessage$.unsubscribe();
  }

  createLoginForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.user = {
      username: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value
    };
    this.store.dispatch(new LoginUser({ user: this.user }));
    this.userForm.reset();
  }

}
