import { Component, Input, OnInit } from '@angular/core';
import { PurchasesService } from '../../../../services/http/purchases.service';
import { environment } from 'src/environments/environment';
import { List } from 'src/app/models/list.model';
import { Purchase } from 'src/app/models/purchase.model';

@Component({
  selector: 'app-user-orders-history',
  templateUrl: './user-orders-history.component.html',
  styleUrls: ['./user-orders-history.component.scss'],
})
export class UserOrdersHistoryComponent implements OnInit {
  imageSrc = environment.imageBook;

  @Input() pageIsSelected: boolean = false;

  purchases: Purchase[] = [];
  nextPage: number = 1;
  loading: boolean = true;

  constructor(public purchaseRest: PurchasesService) {}

  ngOnInit(): void {
    this.getPurchases(this.nextPage);
  }

  getPurchases(page: number) {
    let subscription = this.purchaseRest
      .getPurchases(page)
      .subscribe((data: List<Purchase>) => {
        for (let p of data.values) {
          this.purchases.push(p);
        }
        this.nextPage = data.nextPage;
        this.loading = false;
        subscription.unsubscribe();
      });
  }

  covertDate(date) {
    return new Date(date).toDateString();
  }

  caseDecimals(value: number, cases: number) {
    return Number(value).toFixed(cases);
  }

  async onScroll() {
    if (this.pageIsSelected && this.nextPage != null && !this.loading) {
      this.loading = true;
      this.getPurchases(this.nextPage);
    }
  }
}
