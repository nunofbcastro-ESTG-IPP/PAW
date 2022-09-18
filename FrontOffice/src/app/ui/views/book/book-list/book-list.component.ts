import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { BookService } from '../../../../services/http/book.service';

import { List } from 'src/app/models/list.model';
import { Book } from 'src/app/models/book.model';
import { environment } from 'src/environments/environment';

const DEFAULT_DURATION = 100;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out')),
    ]),
  ],
})
export class BookListComponent implements OnInit {
  imageUrl = environment.imageBook;

  paginationList?: Array<number>;
  pageSelected: number = 1;
  pageLast!: number;
  offset: number = 5;
  books!: Book[];
  collapsed = true;

  search!: string;
  sort!: string;
  ordination!: number;

  constructor(public rest: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.books = null;
    let subscribe = this.rest
      .getBooks(this.pageSelected, this.sort, this.ordination, this.search)
      .subscribe(
        (data: List<Book>) => {
          this.books = data.values;

          this.pageSelected = data.page;
          this.pageLast = data.totalPages;
          this.pagination();
          subscribe.unsubscribe();
        },
        (error) => {
          subscribe.unsubscribe();
          this.router.navigate(['/']);
        }
      );
  }

  getLowPrice(book: Book) {
    return book.price.reduce(function (prev, current) {
      return prev.price > current.price ? prev : current;
    }).price;
  }

  selectPage(page: number) {
    this.pageSelected = page;
    this.getBooks();
  }

  pagination() {
    this.paginationList = [];

    if (this.pageSelected < 1) {
      this.pageSelected = 1;
    }

    if (this.pageLast < this.pageSelected) {
      this.pageLast = this.pageSelected;
    }

    let end: number;
    let start: number;

    start = this.pageSelected - this.offset / 2;
    start = Math.max(start, 1);
    start = Math.round(start);

    end = start + this.offset - 1;

    if (end > this.pageLast) {
      end = this.pageLast;
      start = end - this.offset + 1;
      start = Math.max(start, 1);
      start = Math.round(start);
    }

    this.paginationList = [];
    for (let i: number = start; i <= end; i++) {
      this.paginationList.push(i);
    }
  }

  expandOrCollapase() {
    this.collapsed = !this.collapsed;
  }

  sortClick(sort: string, ordination: number) {
    this.sort = sort;
    this.ordination = ordination;

    this.getBooks();
  }

  searchClick(search: string) {
    this.search = search;
    this.getBooks();
  }
}
