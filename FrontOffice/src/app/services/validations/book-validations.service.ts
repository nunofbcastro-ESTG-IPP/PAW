import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BookValidationsService {
  constructor() {}

  public ISBNValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(/^[0-9]{13}$/);
      const valid = regex.test(control.value + '');

      return !valid ? { invalidISBN: true } : null;
    };
  }
}
