import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { UserValidationsService } from '../../../../services/validations/user-validations.service';

import { Input } from '../../../../models/input.model';
import { AuthService } from 'src/app/services/http/auth.service';
import { Router } from '@angular/router';
import { RoutingStateService } from 'src/app/services/data/routing-state.service';
import { LocalStorageTime } from 'src/app/services/LocalStorageTime';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
  visibleLoading: boolean = false;

  previousRoute!: string;

  error!: string;
  name: Input<string> = new Input();
  email: Input<string> = new Input();
  password: Input<string> = new Input();
  dateBirthday: Input<string> = new Input();

  nameDebounce = new Subject<string>();
  emailDebounce = new Subject<string>();
  passwordDebounce = new Subject<string>();
  dateBirthdayDebounce = new Subject<string>();

  constructor(
    private router: Router,
    private routingState: RoutingStateService,
    private userValidationsService: UserValidationsService,
    private authServive: AuthService
  ) {}

  ngOnInit() {
    this.previousRoute = this.routingState.getPreviousUrl();

    this.nameDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validateName();
      });

    this.emailDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validateEmail();
      });

    this.passwordDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validatePassword();
      });

    this.dateBirthdayDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validateDateBirthday();
      });
  }

  ngOnDestroy() {
    this.nameDebounce.unsubscribe();
    this.emailDebounce.unsubscribe();
    this.passwordDebounce.unsubscribe();
    this.dateBirthdayDebounce.unsubscribe();
  }

  validateName() {
    let error = this.userValidationsService.validateName(this.name.value);

    if (error != null) {
      this.name.error = error;
      return false;
    }

    this.name.error = null;
    return true;
  }

  validateEmail() {
    let error = this.userValidationsService.validateEmail(this.email.value);

    if (error != null) {
      this.email.error = error;
      return false;
    }

    this.email.error = null;
    return true;
  }

  validatePassword() {
    let passwordValidation = this.userValidationsService.validatePassword(
      this.password.value
    ) as any[];

    if (passwordValidation.length > 0) {
      this.password.error = passwordValidation[0].message;
      return false;
    }

    this.password.error = null;
    return true;
  }

  validateDateBirthday() {
    let error = this.userValidationsService.validateDateBirth(
      this.dateBirthday.value
    );

    if (error != null) {
      this.dateBirthday.error = error;
      return false;
    }

    this.dateBirthday.error = null;
    return true;
  }

  register() {
    this.visibleLoading = true;

    let isValid = true;

    if (!this.validateName()) {
      isValid = false;
    }

    if (!this.validateEmail()) {
      isValid = false;
    }

    if (!this.validatePassword()) {
      isValid = false;
    }

    if (!this.validateDateBirthday()) {
      isValid = false;
    }

    if (isValid) {
      let subscribe = this.authServive
        .register(
          this.name.value,
          this.email.value,
          this.password.value,
          this.dateBirthday.value
        )
        .subscribe(
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
            if (error.error.dataBase) {
              this.error = 'User already existing';
            } else {
              this.name.error = error.error.name;
              this.email.error = error.error.email;
              this.password.error = error.error.password[0].message;
              this.dateBirthday.error = error.error.dateBirthday;
            }
            this.visibleLoading = false;
            subscribe.unsubscribe();
          }
        );
    }
  }

  goBack() {
    this.router.navigate([this.previousRoute]);
  }
}
