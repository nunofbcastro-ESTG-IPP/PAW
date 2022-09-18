export class BooksPurchased {
  constructor(
    public bookId: string,
    public isbn: string,
    public title: string,
    public state: string,
    public image: string,
    public quantity: number,
    public unitaryPrice: number
  ) {}
}
