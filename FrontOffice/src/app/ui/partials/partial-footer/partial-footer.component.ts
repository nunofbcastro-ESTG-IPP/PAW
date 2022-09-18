import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partial-footer',
  templateUrl: './partial-footer.component.html',
  styleUrls: ['./partial-footer.component.scss'],
})
export class PartialFooterComponent implements OnInit {
  currentYear?: number;

  constructor() {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
