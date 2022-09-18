import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem.model';
import { environment } from 'src/environments/environment';
import { CartService } from '../../../services/data/cart.service';

@Component({
  selector: 'app-partial-cart',
  templateUrl: './partial-cart.component.html',
  styleUrls: ['./partial-cart.component.scss'],
})
export class PartialCartComponent implements OnInit {
  imageUrl = environment.imageBook;

  itens!: CartItem[];

  private subscritionCart$!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscritionCart$ = this.cartService
      .getProduts()
      .subscribe((res: CartItem[]) => {
        this.itens = res;
      });
  }

  ngOnDestroy(): void {
    this.subscritionCart$.unsubscribe();
  }
}
