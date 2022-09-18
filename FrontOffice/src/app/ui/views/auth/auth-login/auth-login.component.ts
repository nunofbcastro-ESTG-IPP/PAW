import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/http/auth.service';
import { UserValidationsService } from 'src/app/services/validations/user-validations.service';
import { RoutingStateService } from 'src/app/services/data/routing-state.service';
import { LocalStorageTime } from 'src/app/services/LocalStorageTime';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  visibleLoading: boolean = false;

  previousRoute!: string;

  errors: string[] = [];

  error!: string;
  email!: string;
  password!: string;

  constructor(
    private router: Router,
    private routingState: RoutingStateService,
    private authServive: AuthService,
    private userValidationsService: UserValidationsService
  ) {
    this.errors.push('Invalid email or password');
    this.errors.push('Servidor error');
  }

  ngOnInit(): void {
    this.previousRoute = this.routingState.getPreviousUrl();
  }

  login() {
    this.visibleLoading = true;

    if (this.email == null) {
      this.error = this.errors[0];
      this.visibleLoading = false;
      return;
    }
    if (this.password == null) {
      this.error = this.errors[0];
      this.visibleLoading = false;
      return;
    }
    if (this.userValidationsService.validateEmail(this.email) != null) {
      this.error = this.errors[0];
      this.visibleLoading = false;
      return;
    }

    let subscribe = this.authServive.login(this.email, this.password).subscribe(
      (response) => {
        LocalStorageTime.setStorage(
          'currentUser',
          JSON.stringify(response),
          86400
        );
        this.goBack();
        subscribe.unsubscribe();
      },
      (error) => {
        if (error.status != 500) {
          this.error = this.errors[0];
        } else {
          this.error = this.errors[1];
        }
        this.visibleLoading = false;
        subscribe.unsubscribe();
      }
    );
  }

  goBack() {
    this.router.navigate([this.previousRoute]);
  }
}
