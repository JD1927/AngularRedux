import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';

const route: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
