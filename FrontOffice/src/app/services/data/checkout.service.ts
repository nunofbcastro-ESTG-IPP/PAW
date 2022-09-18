import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartItem } from 'src/app/models/cartItem.model';
import { Shipping } from 'src/app/models/shipping';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private cartItems!: Array<CartItem>;
  private shipping!: Shipping;
  private amount!: number;
  private points!: number;

  private cartSource = new BehaviorSubject(this.cartItems);
  private shippingSource = new BehaviorSubject(this.shipping);
  private amountSource = new BehaviorSubject(this.amount);
  private pointsSource = new BehaviorSubject(this.points);

  constructor(private cartService: CartService) {
    this.cartService.getProduts().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.cartSource.next(this.cartItems);
    });

    this.cartService.getAmount().subscribe((amount: number) => {
      this.amount = amount;
      this.amountSource.next(this.amount);
    });
  }

  getCart() {
    return this.cartSource.asObservable();
  }

  removeDataCart() {
    this.cartService.removeAllProduts();
  }

  getAmount() {
    return this.amountSource.asObservable();
  }

  getShipping() {
    return this.shippingSource.asObservable();
  }

  setShipping(shipping: Shipping) {
    this.shipping = shipping;
    this.shippingSource.next(this.shipping);
  }

  getPoints() {
    return this.pointsSource.asObservable();
  }

  setPoints(points: number) {
    this.points = points;
    this.pointsSource.next(this.points);
  }
}
