import { Component, OnInit } from '@angular/core';
import { SubscriberService } from 'src/app/services/http/subscriber.service';

import validator from 'validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  display: boolean = false;
  email!: string;
  error!: string;

  constructor(private subscriberService: SubscriberService) {}

  ngOnInit(): void {}

  showDialog() {
    this.display = true;
  }

  subscribe() {
    if (this.email == null || !validator.isEmail(this.email)) {
      this.error = 'Invalid email';
      return;
    }
    this.error = '';
    this.display = false;
    this.subscriberService.subscribe(this.email).subscribe();

    let subscribe = this.subscriberService.subscribe(this.email).subscribe(
      (response) => {
        subscribe.unsubscribe();
        this.email = '';
      },
      (error) => {
        subscribe.unsubscribe();
        this.email = '';
      }
    );
  }
}
