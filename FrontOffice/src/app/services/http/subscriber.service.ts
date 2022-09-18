import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

const endpoint = `${environment.api}subscriber/`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  constructor(private http: HttpClient) {}

  subscribe(email: string): Observable<any> {
    return this.http
      .post<any>(endpoint, JSON.stringify({ email }), httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
