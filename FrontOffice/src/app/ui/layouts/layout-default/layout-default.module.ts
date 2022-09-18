import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutDefaultComponent } from './layout-default.component';

import { PartialsLayoutModule } from '../../partials/partials-layout.module';

import { HomeModule } from '../../views/home/home.module';
import { BookModule } from '../../views/book/book.module';
import { AuthModule } from '../../views/auth/auth.module';
import { UserModule } from '../../views/user/user.module';
import { PurchaseModule } from '../../views/purchase/purchase.module';

@NgModule({
  declarations: [LayoutDefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    PartialsLayoutModule,
    HomeModule,
    AuthModule,
    BookModule,
    PurchaseModule,
    UserModule,
    BrowserAnimationsModule,
  ],
})
export class LayoutDefaultModule {}
