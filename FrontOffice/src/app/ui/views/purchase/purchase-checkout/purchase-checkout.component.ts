import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { CartItem } from 'src/app/models/cartItem.model';
import { Price } from 'src/app/models/price.model';
import { CartService } from 'src/app/services/data/cart.service';
import { NotificationsService } from 'src/app/services/data/notifications.service';
import { RoutingStateService } from 'src/app/services/data/routing-state.service';
import { PurchasesService } from 'src/app/services/http/purchases.service';

@Component({
  selector: 'app-purchase-checkout',
  templateUrl: './purchase-checkout.component.html',
  styleUrls: ['./purchase-checkout.component.scss'],
})
export class PurchaseCheckoutComponent implements OnInit {
  visibleLoading = true;
  previousRoute: string;

  activated: number = 0;

  subscritionCart$!: Subscription;

  constructor(
    private cartService: CartService,
    private notificationsService: NotificationsService,
    private purchasesService: PurchasesService,
    private router: Router,
    private routingState: RoutingStateService
  ) {}

  ngOnInit(): void {
    this.previousRoute = this.routingState.getPreviousUrl();

    this.subscritionCart$ = this.cartService
      .getProduts()
      .subscribe((cartItens: CartItem[]) => {
        this.validateCart(cartItens);
      });
  }

  ngOnDestroy(): void {
    this.subscritionCart$.unsubscribe();
  }

  private validateCart(cartItems: CartItem[]) {
    console.log(this.previousRoute);
    if (cartItems.length == 0) {
      this.notificationsService.showWarning('Warn', 'Empty cart');
      this.goBack();
      return;
    }

    let subscribe = this.purchasesService.getBooksCart(cartItems).subscribe(
      (response: Book[]) => {
        if (!this.compareCart(cartItems, response)) {
          this.notificationsService.showWarning('Warn', 'Invalid cart');
          this.goBack();
          return;
        }
        this.visibleLoading = false;
      },
      (error) => {
        this.notificationsService.showWarning('Warn', 'Invalid cart');
        this.goBack();
        return;
      }
    );
  }

  private getPriceByState(state: string, book: Book): Price {
    for (let p of book.price) {
      if (p.state == state) {
        return p;
      }
    }

    return null;
  }

  private comparteItem(item: CartItem, books: Book[]): boolean {
    for (let book of books) {
      if (item._id == book._id) {
        let price: Price = this.getPriceByState(item.state, book);
        console.log(item.quantity + ' ' + price.stock);
        if (
          price == null ||
          item.quantity > price.stock ||
          item.price != price.price
        ) {
          return false;
        }
      }
    }

    return true;
  }

  private compareCart(cartItems: CartItem[], books: Book[]): boolean {
    for (let item of cartItems) {
      if (!this.comparteItem(item, books)) {
        return false;
      }
    }

    return true;
  }

  next(): void {
    if (this.activated == 2) {
      return;
    }

    this.activated++;
  }

  previus(): void {
    if (this.activated == 0) {
      return;
    }

    this.activated--;
  }

  changeSteep(steep: string) {
    if (steep == 'next') {
      this.next();
    } else if (steep == 'previus') {
      this.previus();
    }
  }

  private goBack() {
    this.router.navigate([this.previousRoute]);
  }
}
