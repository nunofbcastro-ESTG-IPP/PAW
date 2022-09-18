export class Review {
  constructor(
    public clientName?: string,
    public clientEmail?: string,
    public clientImage?: string,
    public review?: string,
    public rating?: number
  ) {}
}
