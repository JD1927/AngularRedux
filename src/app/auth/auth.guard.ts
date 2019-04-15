import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from '../app-store/reducers/reducers';
import { IUser } from './models/user';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user$: Subscription = new Subscription();
  user: IUser;
  constructor(
    private router: Router,
    private store: Store<fromAuth.AppState>,
  ) { }

  canActivate() {
    this.user$ = this.store.select(fromAuth.getAuth)
    .pipe(
      tap(res => this.user = res)
    )
    .subscribe();
    if (this.user && this.user.uid !== null) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}

