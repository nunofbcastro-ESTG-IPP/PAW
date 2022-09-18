import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Purchase } from 'src/app/models/purchase.model';
import { CartItem } from 'src/app/models/cartItem.model';
import { Book } from 'src/app/models/book.model';
import { List } from 'src/app/models/list.model';
import { Shipping } from 'src/app/models/shipping';

const endpoint = `${environment.api}purchases/`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getPurchases(page: number): Observable<List<Purchase>> {
    return this.http
      .get<List<Purchase>>(`${endpoint}?page=${page}`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getBooksCart(cart: CartItem[]): Observable<Book[]> {
    return this.http
      .post<Book[]>(`${endpoint}booksCart/`, {
        cart: JSON.stringify(cart),
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  sendPayment(
    token: string,
    cart: CartItem[],
    shipping: Shipping,
    name: string,
    pointsUsed: number
  ): Promise<any> {
    return this.http
      .post(`${endpoint}payment/`, {
        token: token,
        cart: JSON.stringify(cart),
        shipping: JSON.stringify(shipping),
        name: name,
        pointsUsed: pointsUsed,
      })
      .toPromise();
  }
}
