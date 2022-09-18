import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { PurchasesService } from 'src/app/services/http/purchases.service';
import { NotificationsService } from 'src/app/services/data/notifications.service';
import { CartItem } from 'src/app/models/cartItem.model';
import { CheckoutService } from 'src/app/services/data/checkout.service';
import { Router } from '@angular/router';
import { Shipping } from 'src/app/models/shipping';
import { Subscription } from 'rxjs';

declare global {
  interface Window {
    Stripe?: any;
  }
}

@Component({
  selector: 'app-purshase-payment',
  templateUrl: './purshase-payment.component.html',
  styleUrls: ['./purshase-payment.component.scss'],
})
export class PurshasePaymentComponent implements OnInit {
  error!: string;

  visibleLoading = false;

  imageUrl: string = environment.imageBook;

  shipping!: Shipping;
  itens!: CartItem[];
  @Output() myEvent = new EventEmitter<string>();
  discount: number = 0;
  points: number = 0;
  userPoints!: number;

  private readonly STRIPE!: any;
  private elementStripe!: any;
  cardNumber: any;
  cardCvv: any;
  cardExp: any;
  form!: any;

  subscritionCart$!: Subscription;
  subscritionAmount$!: Subscription;
  subscritionShipping$!: Subscription;
  subscritionPoints$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private purchasesService: PurchasesService,
    private notificationsService: NotificationsService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    this.STRIPE = window.Stripe(environment.stripe_pk);
  }

  ngOnInit() {
    this.form = this.fb.group({
      amount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]],
      cardCvv: [false, [Validators.required, Validators.requiredTrue]],
      cardExp: [false, [Validators.required, Validators.requiredTrue]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      discount: [false, [Validators.required]],
    });

    this.subscritionCart$ = this.checkoutService
      .getCart()
      .subscribe((cartItens: CartItem[]) => {
        this.itens = cartItens;
      });

    this.subscritionAmount$ = this.checkoutService
      .getAmount()
      .subscribe((amount: number) => {
        this.form.patchValue({
          amount: amount,
        });
      });

    this.subscritionShipping$ = this.checkoutService
      .getShipping()
      .subscribe((shipping: Shipping) => {
        this.shipping = shipping;
      });

    this.subscritionPoints$ = this.checkoutService
      .getPoints()
      .subscribe((points: number) => {
        this.userPoints = points;
      });

    this.createStripeElement();
  }

  ngOnDestroy(): void {
    this.subscritionCart$.unsubscribe();
    this.subscritionAmount$.unsubscribe();
    this.subscritionShipping$.unsubscribe();
    this.subscritionPoints$.unsubscribe();
  }

  private createStripeElement() {
    this.elementStripe = this.STRIPE.elements({});

    const cardNumber = this.elementStripe.create('cardNumber', {
      placeholder: 'ex: 4242 4242 4242 4242',
    });
    const cardExp = this.elementStripe.create('cardExpiry', {
      placeholder: 'ex: 12/22',
    });
    const cardCvc = this.elementStripe.create('cardCvc', {
      placeholder: 'ex: 000',
    });

    cardNumber.mount('#card');
    cardExp.mount('#exp');
    cardCvc.mount('#cvc');

    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCvv = cardCvc;

    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardExp.addEventListener('change', this.onChangeExp.bind(this));
    this.cardCvv.addEventListener('change', this.onChangeCvv.bind(this));
  }

  async initPay() {
    this.visibleLoading = true;
    try {
      this.form.disable();

      const { token } = await this.STRIPE.createToken(this.cardNumber);

      const { data } = await this.purchasesService.sendPayment(
        token.id,
        this.itens,
        this.shipping,
        this.form.get('name').value,
        this.points
      );

      this.STRIPE.handleCardPayment(data.client_secret)
        .then(async () => {
          this.checkoutService.removeDataCart();
          this.notificationsService.showSuccess(
            'Success',
            'Purchase made successfully'
          );

          this.router.navigate(['/user/dashboard'], {
            queryParams: { page: 1 },
          });
        })
        .catch(() => {
          this.error = 'Error with payment';

          this.visibleLoading = false;
          this.form.enable();
        });
    } catch (e) {
      this.error = 'Error with payment';

      this.visibleLoading = false;
      this.form.enable();
    }
  }

  onChangeCard({ error }: any) {
    this.form.patchValue({ cardNumber: !error });
  }

  onChangeCvv({ error }: any) {
    this.form.patchValue({ cardCvv: !error });
  }

  caseDecimals(value: number, cases: number) {
    return Number(value).toFixed(cases);
  }

  onChangeExp({ error }: any) {
    this.form.patchValue({ cardExp: !error });
  }

  getTotalPrice($event) {
    if ($event) {
      if (this.userPoints > 100) {
        this.points = 100;
      } else {
        this.points = this.userPoints;
      }
      this.discount = this.form.get('amount').value * (this.points / 100);
    } else {
      this.points = 0;
      this.discount = 0;
    }
  }

  previus() {
    this.myEvent.emit('previus');
  }
}
