import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { CustomModule } from '../../custom/custom.module';

@NgModule({
  declarations: [AuthLoginComponent, AuthRegisterComponent],
  imports: [CommonModule, RouterModule, FormsModule, CustomModule],
  exports: [AuthLoginComponent, AuthRegisterComponent],
})
export class AuthModule {}
