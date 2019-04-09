import { Injectable } from '@angular/core';
import { from , Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: IUser): Observable<any> {
    return from([true]);
  }
}
