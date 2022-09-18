import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { UserValidationsService } from '../../../../services/validations/user-validations.service';

import { Input } from '../../../../models/input.model';
import { UserService } from 'src/app/services/http/user.service';
import { User } from 'src/app/models/user.model';
import { NotificationsService } from 'src/app/services/data/notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  imageSrc: string = environment.imageUser;
  imageNotFoundUser: string = environment.imageNotFoundUser;

  error!: string;

  name: Input<string> = new Input();
  email: Input<string> = new Input();
  password: Input<string> = new Input();
  phoneNumber: Input<number> = new Input();
  address: Input<string> = new Input();
  dateBirthday: Input<string> = new Input();
  points!: Number;
  image!: string;

  nameDebounce = new Subject<string>();
  emailDebounce = new Subject<string>();
  passwordDebounce = new Subject<string>();
  phoneNumberDebounce = new Subject<string>();
  addressDebounce = new Subject<string>();
  dateBirthdayDebounce = new Subject<string>();

  constructor(
    private userService: UserService,
    private userValidationsService: UserValidationsService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
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

    this.phoneNumberDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validatePhoneNumber();
      });

    this.addressDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validateAddress();
      });

    this.dateBirthdayDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validateDateBirthday();
      });

    this.getUser();
  }

  ngOnDestroy() {
    this.nameDebounce.unsubscribe();
    this.emailDebounce.unsubscribe();
    this.passwordDebounce.unsubscribe();
    this.phoneNumberDebounce.unsubscribe();
    this.addressDebounce.unsubscribe();
    this.dateBirthdayDebounce.unsubscribe();
  }

  getUser() {
    let subscription = this.userService.getUser().subscribe((data: any) => {
      this.name.value = data.user.name;
      this.email.value = data.user.email;
      this.phoneNumber.value = data.user.phoneNumber;
      this.address.value = data.user.address;
      this.dateBirthday.value = new Date(data.user.dateOfBirthday)
        .toISOString()
        .split('T')[0];
      this.points = data.user.points;
      this.image = data.user.profileImage;
      subscription.unsubscribe();
    });
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

  validatePhoneNumber() {
    let error = this.userValidationsService.validateNumberPhone(
      this.phoneNumber.value
    );

    if (error != null) {
      this.phoneNumber.error = error;
      return false;
    }

    this.phoneNumber.error = null;
    return true;
  }

  validateAddress() {
    let error = this.userValidationsService.validateAddress(this.address.value);

    if (error != null) {
      this.address.error = error;
      return false;
    }

    this.address.error = null;
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

  edit() {
    let isValid = true;

    if (!this.validateName()) {
      isValid = false;
    }

    if (!this.validateEmail()) {
      isValid = false;
    }

    if (this.password.value != null && !this.validatePassword()) {
      isValid = false;
    }

    if (this.phoneNumber.value != null && !this.validatePhoneNumber()) {
      isValid = false;
    }

    if (this.address.value != null && !this.validateAddress()) {
      isValid = false;
    }

    if (!this.validateDateBirthday()) {
      isValid = false;
    }

    if (isValid) {
      let subscription = this.userService
        .editUser(
          this.name.value,
          this.email.value,
          this.password.value,
          this.phoneNumber.value,
          this.address.value,
          this.dateBirthday.value
        )
        .subscribe(
          (response) => {
            this.notificationsService.showSuccess(
              'Success',
              'Successfully changed data'
            );
            subscription.unsubscribe();
          },
          (error) => {
            this.error = 'Error saving data';
            subscription.unsubscribe();
          }
        );
    }
  }
}
