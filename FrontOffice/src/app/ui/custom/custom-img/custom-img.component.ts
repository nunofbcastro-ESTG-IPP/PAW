import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'custom-img',
  templateUrl: './custom-img.component.html',
  styleUrls: ['./custom-img.component.scss'],
})
export class CustomImgComponent implements OnInit {
  @Input() imageNotFound: string = environment.imageNotFound;
  @Input() src!: string;
  @Input() class!: string;

  constructor() {}

  ngOnInit(): void {}

  onImgError(event) {
    event.target.src = this.imageNotFound;
  }
}
