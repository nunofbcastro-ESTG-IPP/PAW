import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { Sales } from 'src/app/models/sales.model';
import { environment } from 'src/environments/environment';

const endpoint = `${environment.api}sales/`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}

  addSale(
    bookIsbn: string,
    title: string,
    description: string,
    coverPhoto: File,
    price: number
  ): Observable<any> {
    var formData: FormData = new FormData();
    formData.append('bookIsbn', bookIsbn);
    formData.append('title', title);
    formData.append('coverPhoto', coverPhoto);
    formData.append('description', description);
    formData.append('price', `${price}`);

    return this.http.post<Sales>(`${endpoint}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getSales(page: number): Observable<List<Sales>> {
    return this.http
      .get<List<Sales>>(`${endpoint}?page=${page}`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
