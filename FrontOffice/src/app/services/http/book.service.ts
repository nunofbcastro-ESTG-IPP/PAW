import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Book } from 'src/app/models/book.model';
import { List } from 'src/app/models/list.model';

import { environment } from 'src/environments/environment';
import { Review } from 'src/app/models/review.model';

const endpoint = `${environment.api}books/`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getBooks(
    page: Number,
    sort: string,
    ordination: number,
    search: string
  ): Observable<List<Book>> {
    console.log(search);

    let endpointFinal = `${endpoint}?page=${page}`;

    if (sort != null && ordination != null) {
      endpointFinal += `&sort=${sort}&ordination=${ordination}`;
    }

    if (search != null) {
      endpointFinal += `&search=${search}`;
    }

    return this.http.get<List<Book>>(endpointFinal, httpOptions);
  }

  getBook(id: String): Observable<Book> {
    return this.http.get<Book>(endpoint + id, httpOptions).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  addReview(bookSelected, data): Observable<any> {
    let url = `${endpoint}addReview/${bookSelected}`;
    return this.http.post(url, data);
  }
}
