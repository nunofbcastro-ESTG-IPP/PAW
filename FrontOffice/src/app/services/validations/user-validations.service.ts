import { Injectable } from '@angular/core';

import * as passwordValidator from 'password-validator';
import validator from 'validator';

@Injectable({
  providedIn: 'root',
})
export class UserValidationsService {
  validatorPassword = new passwordValidator();

  constructor() {
    this.addRestrictionsPassword();
  }

  addRestrictionsPassword(): void {
    this.validatorPassword
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(50) // Maximum length 50
      .has()
      .uppercase(1) // Must have uppercase letters
      .has()
      .lowercase(1) // Must have lowercase letters
      .has()
      .digits(2) // Must have at least 2 digits
      .has()
      .symbols(1) // Must have at least 2 symbols
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .usingPlugin(validator.isEmail, 'Password should be an email'); // Blacklist these values
  }

  validateName(name: string): string {
    let validationStringNumber = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/
    );
    let validationNumber = new RegExp(/^[0-9]+$/);

    if (name == null || name.length < 3) {
      return 'Very short name';
    }

    if (
      validationStringNumber.test(`${name}`) ||
      validationNumber.test(`${name}`)
    ) {
      return 'Invalid name';
    }
    return null;
  }

  validateEmail(email: string): string {
    if (email == null || !validator.isEmail(email)) {
      return 'Invalid email';
    }
    return null;
  }

  validatePassword(password: string) {
    return this.validatorPassword.validate(password, { details: true });
  }

  private age(birth: Date): number {
    let today = new Date();
    let diferencaAnos = today.getFullYear() - birth.getFullYear();

    if (
      new Date(today.getFullYear(), today.getMonth(), today.getDate()) <
      new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    ) {
      diferencaAnos--;
    }
    return diferencaAnos;
  }

  validateDateBirth(date: string): string {
    let birth = new Date(date);

    if (date == null || !(birth instanceof Date)) {
      return 'Invalid date';
    }

    let age = this.age(birth);

    if (age < 18) {
      return 'Must be at least 18 years old';
    }

    if (age > 120) {
      return "Can't be more than 120 years old";
    }

    return null;
  }

  validateNumberPhone(numberPhone: number): string {
    let validation = new RegExp(/^9[1236]{1}[0-9]{7}$/);

    if (!validation.test(`${numberPhone}`)) {
      return 'Invalid number phone';
    }

    return null;
  }

  validateAddress(address: string): string {
    if (address == null || address.length < 3) {
      return 'Invalid address';
    }
    return null;
  }
}
