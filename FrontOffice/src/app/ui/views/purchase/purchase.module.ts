import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PurchaseCartDetailsComponent } from './purchase-cart-details/purchase-cart-details.component';
import { PurchaseCheckoutComponent } from './purchase-checkout/purchase-checkout.component';
import { PurshaseShippingComponent } from './purshase-shipping/purshase-shipping.component';
import { PurshaseReviewComponent } from './purshase-review/purshase-review.component';
import { PurshasePaymentComponent } from './purshase-payment/purshase-payment.component';
import { CustomModule } from '../../custom/custom.module';

@NgModule({
  declarations: [
    PurchaseCartDetailsComponent,
    PurchaseCheckoutComponent,
    PurshaseShippingComponent,
    PurshaseReviewComponent,
    PurshasePaymentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CustomModule,
  ],
  exports: [PurchaseCartDetailsComponent, PurchaseCheckoutComponent],
})
export class PurchaseModule {}
