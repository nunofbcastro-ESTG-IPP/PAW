import { Price } from './price.model';
import { Review } from './review.model';

export class Book {
  constructor(
    public _id: string,
    public isbn: string,
    public title: string,
    public publictitle: string,
    public descrition: string,
    public author: string,
    public number_of_pages: number,
    public publishers: string,
    public publishDate: string,
    public lang: string,
    public price: Price[],
    public image: string,
    public review: Review[]
  ) {}
}
