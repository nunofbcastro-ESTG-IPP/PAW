import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageTime } from 'src/app/services/LocalStorageTime';

import { environment } from 'src/environments/environment';

const endpoint = `${environment.api}auth/`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        endpoint + 'login',
        JSON.stringify({ email, password }),
        httpOptions
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    dateOfBirthday: string
  ): Observable<any> {
    return this.http
      .post<any>(
        endpoint + 'register',
        JSON.stringify({ name, email, password, dateOfBirthday }),
        httpOptions
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  logout() {
    LocalStorageTime.removeStorage('currentUser');
  }
}
