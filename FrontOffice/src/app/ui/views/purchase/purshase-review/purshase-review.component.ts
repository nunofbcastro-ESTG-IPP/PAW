import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.model';
import { Shipping } from 'src/app/models/shipping';
import { CheckoutService } from 'src/app/services/data/checkout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purshase-review',
  templateUrl: './purshase-review.component.html',
  styleUrls: ['./purshase-review.component.scss'],
})
export class PurshaseReviewComponent implements OnInit {
  @Output() myEvent = new EventEmitter<string>();

  imageUrl: string = environment.imageBook;

  amount!: number;
  shipping!: Shipping;
  itens!: CartItem[];

  subscritionCart$!: Subscription;
  subscritionAmount$!: Subscription;
  subscritionShipping$!: Subscription;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.subscritionCart$ = this.checkoutService
      .getCart()
      .subscribe((itens: CartItem[]) => {
        this.itens = itens;
      });
    this.subscritionAmount$ = this.checkoutService
      .getAmount()
      .subscribe((amount: number) => {
        this.amount = amount;
      });
    this.subscritionShipping$ = this.checkoutService
      .getShipping()
      .subscribe((shipping: Shipping) => {
        this.shipping = shipping;
      });
  }

  ngOnDestroy(): void {
    this.subscritionCart$.unsubscribe();
    this.subscritionAmount$.unsubscribe();
    this.subscritionShipping$.unsubscribe();
  }

  next() {
    this.myEvent.emit('next');
  }

  previus() {
    this.myEvent.emit('previus');
  }
}
