import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ClientGuardService } from 'src/app/services/guard/client-guard.service';

import { PurchaseCartDetailsComponent } from 'src/app/ui/views/purchase/purchase-cart-details/purchase-cart-details.component';
import { PurchaseCheckoutComponent } from 'src/app/ui/views/purchase/purchase-checkout/purchase-checkout.component';

const routes: Routes = [
  {
    path: 'shoppingCart',
    component: PurchaseCartDetailsComponent,
    data: { title: 'Shopping cart', animation: 'shoppingCart' },
  },
  {
    path: 'checkout',
    component: PurchaseCheckoutComponent,
    data: { title: 'Checkout', animation: 'checkout' },
    canActivate: [ClientGuardService],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
})
export class PurchaseRoutesModule {}
