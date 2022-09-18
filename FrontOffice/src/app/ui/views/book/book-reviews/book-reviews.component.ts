import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.scss'],
})
export class BookReviewsComponent implements OnInit {
  imageSrc: string = environment.imageUser;
  imageNotFoundUser: string = environment.imageNotFoundUser;
  display: boolean = false;

  @Input() bookSelected: string;
  @Input() bookReviews: Review[];

  constructor() {}

  ngOnInit(): void {}

  showDialog() {
    this.display = true;
  }

  rating(rating: number) {
    return Array(rating)
      .fill(0)
      .map((x, i) => i);
  }

  /*calculateMeanRating() {
    for (let index = 0; index < this.bookReviews.length; index++) {
      this.meanRating += this.bookReviews[index].rating;
    }
    console.log(this.meanRating);
  }*/
}
