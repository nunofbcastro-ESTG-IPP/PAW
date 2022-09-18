import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UnauthGuardService } from 'src/app/services/guard/unauth-guard.service';

import { AuthLoginComponent } from 'src/app/ui/views/auth/auth-login/auth-login.component';
import { AuthRegisterComponent } from 'src/app/ui/views/auth/auth-register/auth-register.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent,
    data: { title: 'Login', animation: 'login' },
    canActivate: [UnauthGuardService],
  },
  {
    path: 'register',
    component: AuthRegisterComponent,
    data: { title: 'Register', animation: 'register' },
    canActivate: [UnauthGuardService],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
})
export class AuthRoutesModule {}
