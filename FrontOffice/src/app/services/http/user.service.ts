import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';
const endpoint = `${environment.api}users/`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUser(): Observable<User> {
    return this.http.get<User>(endpoint);
  }

  editUser(
    name: string,
    email: string,
    password: string,
    phoneNumber: number,
    address: string,
    dateOfBirthday: string
  ): Observable<any> {
    return this.http
      .put<any>(
        endpoint,
        JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          address,
          dateOfBirthday,
        }),
        httpOptions
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
