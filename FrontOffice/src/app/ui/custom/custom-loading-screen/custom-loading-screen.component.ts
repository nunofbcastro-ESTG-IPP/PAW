import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-loading-screen',
  templateUrl: './custom-loading-screen.component.html',
  styleUrls: ['./custom-loading-screen.component.scss'],
})
export class CustomLoadingScreenComponent implements OnInit {
  @Input() visibleLoading: boolean;

  constructor() {
    this.visibleLoading = true;
  }

  ngOnInit(): void {}
}
