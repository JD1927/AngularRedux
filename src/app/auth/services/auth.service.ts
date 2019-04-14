import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userFake: IUser = {
    username: 'j',
    email: 'j@j',
    password: 'a'
  };

  constructor() { }

  login(user: IUser): Observable<any> {
    let toSend = {
      isLoading: false,
      error: true,
      user
    };
    if (JSON.stringify(user) === JSON.stringify(this.userFake)) {
      toSend = {
        isLoading: false,
        error: false,
        user
      };
    } else {
      return throwError('Invalid username or password').pipe(delay(5000));
    }
    return of (toSend).pipe(delay(5000));
  }
}
