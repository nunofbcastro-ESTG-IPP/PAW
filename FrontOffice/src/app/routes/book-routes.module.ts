import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from 'src/app/ui/views/book/book-list/book-list.component';
import { BookDetailsComponent } from 'src/app/ui/views/book/book-details/book-details.component';
import { BookSellingComponent } from 'src/app/ui/views/book/book-selling/book-selling.component';

import { ClientGuardService } from '../services/guard/client-guard.service';

const routes: Routes = [
  {
    path: 'bookList',
    component: BookListComponent,
    data: { title: 'Book List', animation: 'bookList' },
  },
  {
    path: 'bookDetails/:id',
    component: BookDetailsComponent,
    data: { title: 'Book Details', animation: 'bookDetails' },
  },
  {
    path: 'bookSelling',
    component: BookSellingComponent,
    data: { title: 'Book Selling' },
    canActivate: [ClientGuardService],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class BookRoutesModule {}
