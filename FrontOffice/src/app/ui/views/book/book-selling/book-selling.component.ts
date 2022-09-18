import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../../services/http/sales.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BookValidationsService } from 'src/app/services/validations/book-validations.service';

@Component({
  selector: 'app-book-selling',
  templateUrl: './book-selling.component.html',
  styleUrls: ['./book-selling.component.scss'],
})
export class BookSellingComponent implements OnInit {
  message: string = '';
  formSale: FormGroup = new FormGroup({});
  preview?: string;
  percentDone?: any = 0;
  error!: string;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public rest: SalesService,
    private bookValidationsService: BookValidationsService
  ) {}

  ngOnInit(): void {
    // Reactive Form
    this.formSale = this.fb.group({
      bookIsbn: [
        '',
        Validators.compose([
          Validators.required,
          this.bookValidationsService.ISBNValidator(),
        ]),
      ],
      title: ['', Validators.required],
      coverPhoto: [null, Validators.required],
      description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      price: ['', Validators.required],
    });
  }

  // Image Preview
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.formSale.patchValue({
      coverPhoto: file,
    });
    //this.formSale.get('coverPhoto').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submitForm() {
    let subscribe = this.rest
      .addSale(
        this.formSale.value.bookIsbn,
        this.formSale.value.title,
        this.formSale.value.description,
        this.formSale.value.coverPhoto,
        this.formSale.value.price
      )
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            //this.percentDone = Math.round((event.loaded / event.total) * 100);
            //console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.percentDone = false;
            subscribe.unsubscribe();
            this.router.navigate(['/user/dashboard'], {
              queryParams: { page: 2 },
            });
        }
      });
  }
}
