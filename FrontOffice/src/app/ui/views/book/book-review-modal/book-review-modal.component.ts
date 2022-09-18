import { Router } from '@angular/router';
import { BookService } from '../../../../services/http/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-review-modal',
  templateUrl: './book-review-modal.component.html',
  styleUrls: ['./book-review-modal.component.scss'],
})
export class BookReviewModalComponent implements OnInit {
  @Input() bookSelected: string;

  submitted = false;
  reviewForm: FormGroup;
  val: number = 3;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.reviewForm = this.fb.group({
      review: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.reviewForm.valid) {
      return false;
    } else {
      return this.bookService
        .addReview(this.bookSelected, this.reviewForm.value)
        .subscribe({
          complete: () => {
            console.log('Review created!');
          },
          error: (e) => {
            console.log(e);
          },
        });
    }
  }
}
