import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/models/price.model';
import { PurchasesService } from 'src/app/services/http/purchases.service';
import { environment } from 'src/environments/environment';
import { Book } from '../../../../models/book.model';
import { CartItem } from '../../../../models/cartItem.model';
import { CartService } from '../../../../services/data/cart.service';

@Component({
  selector: 'app-purchase-cart-details',
  templateUrl: './purchase-cart-details.component.html',
  styleUrls: ['./purchase-cart-details.component.scss'],
})
export class PurchaseCartDetailsComponent implements OnInit {
  imageUrl = environment.imageBook;

  cartItens!: CartItem[];
  cartItensMaxSize: number[] = [];
  amount!: number;
  itens: Book[] = [];

  private subscribeCartItens$!: any;
  private subscribeAmount$!: any;
  private subscribeItens$!: any;

  constructor(
    private cartService: CartService,
    private purchasesService: PurchasesService
  ) {}

  ngOnInit(): void {
    this.getBooksCartHttps();
  }

  ngOnDestroy(): void {
    this.subscribeCartItens$.unsubscribe();
    this.subscribeAmount$.unsubscribe();
    this.subscribeItens$.unsubscribe();
  }

  getBooksCartHttps() {
    this.subscribeCartItens$ = this.cartService
      .getProduts()
      .subscribe((res: CartItem[]) => {
        this.cartItens = res;
      });
    this.subscribeAmount$ = this.cartService
      .getAmount()
      .subscribe((res: number) => {
        this.amount = res;
      });
    this.subscribeItens$ = this.purchasesService
      .getBooksCart(this.cartItens)
      .subscribe(
        (response: Book[]) => {
          this.itens = response;
          this.setCartItensMaxSize();
        },
        (error) => {}
      );
  }

  removeItem(i: number) {
    this.cartService.removeProdut(this.cartItens[i]);

    this.cartItensMaxSize.splice(i, 1);
  }

  removeAllItens() {
    this.cartService.removeAllProduts();
  }

  getPriceBook(_id: string, state: string): Price {
    for (let itemBook of this.itens) {
      if (_id == itemBook._id) {
        for (let p of itemBook.price) {
          if (p.state == state) {
            return p;
          }
        }
      }
    }

    return null;
  }

  setCartItensMaxSize() {
    this.cartItensMaxSize = [];
    for (let item of this.cartItens) {
      let price: Price = this.getPriceBook(item._id, item.state);
      if (price != null) {
        this.cartItensMaxSize.push(price.stock);
      } else {
        this.cartItensMaxSize.push(0);
      }
    }
  }

  changeSize(newSize: number, i: number) {
    if (i < this.cartItensMaxSize.length) {
      if (newSize < 1) {
        newSize = 1;
      } else if (this.cartItensMaxSize[i] < newSize) {
        newSize = Number(this.cartItensMaxSize[i]);
      }

      this.cartItens[i].quantity = newSize;

      this.cartService.changeQuantity(
        this.cartItens[i]._id,
        this.cartItens[i].state,
        newSize
      );
    }
  }
}
