import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';

import { Input } from 'src/app/models/input.model';
import { Shipping } from 'src/app/models/shipping';
import { CheckoutService } from 'src/app/services/data/checkout.service';
import { UserService } from 'src/app/services/http/user.service';
import { UserValidationsService } from 'src/app/services/validations/user-validations.service';

@Component({
  selector: 'app-purshase-shipping',
  templateUrl: './purshase-shipping.component.html',
  styleUrls: ['./purshase-shipping.component.scss'],
})
export class PurshaseShippingComponent implements OnInit {
  @Output() myEvent = new EventEmitter<string>();

  amount!: number;
  name: Input<string> = new Input();
  address: Input<string> = new Input();
  phoneNumber: Input<number> = new Input();

  nameDebounce = new Subject<string>();
  phoneNumberDebounce = new Subject<string>();
  addressDebounce = new Subject<string>();

  subscritionAmount$!: Subscription;
  subscritionShipping$!: Subscription;

  constructor(
    private userService: UserService,
    private checkoutService: CheckoutService,
    private userValidationsService: UserValidationsService
  ) {}

  ngOnInit(): void {
    this.nameDebounce
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.validateName();
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

    this.subscritionAmount$ = this.checkoutService
      .getAmount()
      .subscribe((amount: number) => {
        this.amount = amount;
      });
    this.subscritionShipping$ = this.checkoutService
      .getShipping()
      .subscribe((shipping: Shipping) => {
        if (shipping == null) {
          this.getUser();
        } else {
          this.name.value = shipping.name;
          this.address.value = shipping.address;
          this.phoneNumber.value = shipping.phoneNumber;
        }
      });
  }

  ngOnDestroy() {
    this.nameDebounce.unsubscribe();
    this.phoneNumberDebounce.unsubscribe();
    this.addressDebounce.unsubscribe();
    this.subscritionAmount$.unsubscribe();
    this.subscritionShipping$.unsubscribe();
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

  next() {
    let isValid = true;

    if (!this.validateName()) {
      isValid = false;
    }

    if (!this.validatePhoneNumber()) {
      isValid = false;
    }

    if (!this.validateAddress()) {
      isValid = false;
    }

    if (isValid) {
      this.checkoutService.setShipping(
        new Shipping(
          this.name.value,
          this.phoneNumber.value,
          this.address.value
        )
      );
      this.myEvent.emit('next');
    }
  }

  getUser() {
    let subscribe = this.userService.getUser().subscribe((data: any) => {
      this.name.value = data.user.name;
      this.address.value = data.user.address;
      this.phoneNumber.value = data.user.phoneNumber;
      this.checkoutService.setPoints(data.user.points);
      subscribe.unsubscribe();
    });
  }
}
