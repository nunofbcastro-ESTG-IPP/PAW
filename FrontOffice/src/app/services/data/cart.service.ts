import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartItem } from 'src/app/models/cartItem.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems!: Array<CartItem>;
  private numberItems: number = 0;
  private amount!: number;

  private cartSource = new BehaviorSubject(this.cartItems);
  private cartSizeSource = new BehaviorSubject(this.numberItems);
  private amountSource = new BehaviorSubject(this.amount);

  constructor() {
    this.getProdutsLocalStorage();
  }

  private getProdutsLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('itens')!);
    if (this.cartItems == null) {
      this.cartItems = [];
    }
    this.cartSource.next(this.cartItems);

    this.contItens();

    this.calculateAmount();
  }

  private saveProductsLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(this.cartItems));
  }

  public searchProduct(_id: string, state: string): any {
    for (let item of this.cartItems) {
      if (item._id == _id && item.state == state) {
        return item;
      }
    }

    return null;
  }

  private contItens() {
    this.numberItems = 0;

    for (let item of this.cartItems) {
      this.numberItems += item.quantity;
    }

    this.cartSizeSource.next(this.numberItems);
  }

  private calculateAmount() {
    this.amount = 0;

    for (let item of this.cartItems) {
      this.amount += item.price * item.quantity;
    }

    this.amountSource.next(this.amount);
  }

  addProdut(cartItem: CartItem) {
    let cartItemExist = this.searchProduct(cartItem._id, cartItem.state);

    if (cartItemExist == null) {
      this.cartItems.push(cartItem);
    } else {
      cartItemExist.quantity += cartItem.quantity;
      cartItemExist.price = cartItem.price;
    }

    this.contItens();
    this.calculateAmount();
    this.saveProductsLocalStorage();
  }

  changeQuantity(_id: string, state: string, quantity: number) {
    let cartItemExist = this.searchProduct(_id, state);

    if (cartItemExist != null) {
      cartItemExist.quantity = quantity;
      this.cartSource.next(this.cartItems);

      this.contItens();
      this.calculateAmount();
      this.saveProductsLocalStorage();
    }
  }

  removeProdut(cartItem: CartItem) {
    this.cartItems.map((a: CartItem, index: any) => {
      if (cartItem._id === a._id && cartItem.state == a.state) {
        this.cartItems.splice(index, 1);
      }
    });

    this.contItens();
    this.calculateAmount();
    this.saveProductsLocalStorage();
  }

  removeAllProduts() {
    this.cartItems = [];
    this.cartSource.next(this.cartItems);

    this.contItens();
    this.calculateAmount();
    this.saveProductsLocalStorage();
  }

  getProduts() {
    return this.cartSource.asObservable();
  }

  getNumberItems() {
    return this.cartSizeSource.asObservable();
  }

  getAmount() {
    return this.amountSource.asObservable();
  }
}
