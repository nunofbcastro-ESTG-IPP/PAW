import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserOrdersHistoryComponent } from './user-orders-history/user-orders-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSalesHistoryComponent } from './user-sales-history/user-sales-history.component';
import { CustomModule } from '../../custom/custom.module';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserOrdersHistoryComponent,
    UserProfileComponent,
    UserSalesHistoryComponent,
  ],
  imports: [
    CommonModule,
    TabViewModule,
    PanelModule,
    ChartModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    CustomModule,
    RouterModule,
    InfiniteScrollModule,
  ],
  exports: [UserDashboardComponent],
})
export class UserModule {}
