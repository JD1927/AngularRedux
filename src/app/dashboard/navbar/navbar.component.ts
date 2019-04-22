import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from 'src/app/auth/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: IUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  signOut() {
    this.authService.signOutGoogle();
  }

  getUser() {
    this.authService.getUser()
    .subscribe(
      (res) => this.user = res,
      (err) => alert(err)
    );
  }

}
