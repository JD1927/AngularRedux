import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: IUser;
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.user).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

}
