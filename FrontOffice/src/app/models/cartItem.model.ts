export class CartItem {
  constructor(
    public _id: string,
    public isbn: string,
    public title: string,
    public author: string,
    public image: string,
    public price: number,
    public state: string,
    public quantity: number = 1
  ) {}
}
