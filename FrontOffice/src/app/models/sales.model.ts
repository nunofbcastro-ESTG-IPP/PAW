export class Sales {
  constructor(
    public _id: string,
    public clientId: string,
    public clientEmail: string,
    public bookIsbn: string,
    public title: string,
    public coverPhoto: string,
    public description: string,
    public price: number,
    public status: string
  ) {}
}
