import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'https://localhost:7229/api/User';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

    register(data: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
  }): Observable<any> {
    return this.http.post(this.api, data);
}
}