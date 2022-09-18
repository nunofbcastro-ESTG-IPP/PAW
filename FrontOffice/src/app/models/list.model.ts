export class List<T> {
  constructor(
    public values: T[],
    public limit: number,
    public totalPages: number,
    public page: number,
    public pagingCounter: number,
    public hasPrevPage: boolean,
    public hasNextPage: boolean,
    public prevPage: number,
    public nextPage: number
  ) {}
}
