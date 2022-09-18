import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFiltersComponent } from './book-filters/book-filters.component';
import { BookReviewsComponent } from './book-reviews/book-reviews.component';
import { BookSellingComponent } from './book-selling/book-selling.component';

import { CustomModule } from '../../custom/custom.module';

import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { BookReviewModalComponent } from './book-review-modal/book-review-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookListComponent,
    BookFiltersComponent,
    BookReviewsComponent,
    BookSellingComponent,
    BookReviewModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule,
    CustomModule,
    DialogModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BookDetailsComponent, BookListComponent],
})
export class BookModule {}
