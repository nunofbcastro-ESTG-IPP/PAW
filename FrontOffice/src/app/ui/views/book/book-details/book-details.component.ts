import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationsService } from '../../../../services/data/notifications.service';

import { Book } from '../../../../models/book.model';
import { CartItem } from '../../../../models/cartItem.model';
import { CartService } from '../../../../services/data/cart.service';
import { BookService } from 'src/app/services/http/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  imageUrl = environment.imageBook;

  visibleLoading: boolean = true;

  selectedState!: number;

  book!: Book;

  private routeSubscribe$!: Subscription;

  constructor(
    private cartService: CartService,
    private bookService: BookService,
    private notificationsService: NotificationsService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscribe$ = this.route.url.subscribe((url) => {
      this.getBook(this.route.snapshot.paramMap.get('id'));
    });
  }

  ngOnDestroy() {
    this.routeSubscribe$.unsubscribe();
  }

  getBook(id: string) {
    let subscribe = this.bookService.getBook(id).subscribe(
      (response: Book) => {
        this.book = response;
        this.visibleLoading = false;
        this.titleService.setTitle(this.book.title);
        subscribe.unsubscribe();
      },
      (error) => {
        subscribe.unsubscribe();
        this.router.navigate(['/book/bookList']);
      }
    );
  }

  addBookToCart() {
    if (this.selectedState == null) {
      this.notificationsService.showError('Error', 'Select a state');
      return;
    }

    let cartMyItemSize: CartItem = this.cartService.searchProduct(
      this.book._id,
      this.book.price[this.selectedState].state
    );
    if (
      this.book.price[this.selectedState].stock == 0 ||
      (cartMyItemSize != null &&
        this.book.price[this.selectedState].stock <= cartMyItemSize.quantity)
    ) {
      this.notificationsService.showError(
        'Error',
        'There are no more book units'
      );
      return;
    }

    let cartItem: CartItem = new CartItem(
      this.book._id,
      this.book.isbn,
      this.book.title,
      this.book.author,
      this.book.image,
      this.book.price[this.selectedState].price,
      this.book.price[this.selectedState].state
    );
    this.cartService.addProdut(cartItem);
    this.notificationsService.showSuccess('Success', 'Book successfully added');
  }

  selectState(state: number) {
    this.selectedState = state;
  }

  verifyStock() {
    let i = 0;
    for (let p of this.book.price) {
      if (p.stock <= 0) {
        i++;
      }
    }

    return !(i == this.book.price.length);
  }
}
