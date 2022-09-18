import { BooksPurchased } from './booksPurchased.model';

export class Purchase {
  constructor(
    public _id: string,
    public clientId: string,
    public clientEmail: string,
    public books: BooksPurchased[],
    public pointsUsed: number,
    public totalPrice: number,
    public purchased_at: Date
  ) {}
}
