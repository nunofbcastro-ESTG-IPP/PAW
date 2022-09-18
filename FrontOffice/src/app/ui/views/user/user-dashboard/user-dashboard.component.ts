import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  private href: string = '';
  index: number = 0;

  private routeSubscribe$!: Subscription;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.href = this.route.snapshot['_routerState'].url.split('?')[0];
    this.routeSubscribe$ = this.route.queryParams.subscribe((params: any) => {
      let page = Number(params.page);
      if (!isNaN(page) && page > 0 && page <= 2) {
        this.index = page;
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscribe$.unsubscribe();
  }

  handleChange() {
    this.location.go(`${this.href}?page=${this.index}`);
  }
}
