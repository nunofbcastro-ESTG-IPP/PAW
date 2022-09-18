import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Sales } from 'src/app/models/sales.model';
import { SalesService } from 'src/app/services/http/sales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-sales-history',
  templateUrl: './user-sales-history.component.html',
  styleUrls: ['./user-sales-history.component.scss'],
})
export class UserSalesHistoryComponent implements OnInit {
  imageSrc = environment.imageSales;

  @Input() pageIsSelected: boolean = false;

  sales: Sales[] = [];
  page: number = 1;
  nextPage: number = 1;
  loading: boolean = true;

  constructor(public salesRest: SalesService) {}

  ngOnInit(): void {
    this.getSales(this.nextPage);
  }

  getSales(page: number) {
    let subscription = this.salesRest.getSales(page).subscribe(
      (data: List<Sales>) => {
        for (let s of data.values) {
          this.sales.push(s);
        }
        this.nextPage = data.nextPage;
        this.loading = false;
        subscription.unsubscribe();
      },
      (error) => {
        subscription.unsubscribe();
      }
    );
  }

  caseDecimals(value: number, cases: number) {
    return Number(value).toFixed(cases);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async onScroll() {
    if (this.pageIsSelected && this.nextPage != null && !this.loading) {
      this.loading = true;
      this.getSales(this.nextPage);
    }
  }
}
