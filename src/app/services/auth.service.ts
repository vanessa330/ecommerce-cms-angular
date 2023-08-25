import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(`${environment.apiUrl}user/login`, body);
  }
  signup(body: any) {
    return this.http.post(`${environment.apiUrl}user/signup`, body);
  }
  changePassword(body: any, httpOptions: any) {
    return this.http.post(
      `${environment.apiUrl}user/changePassword`,
      body,
      httpOptions
    );
  }
  forgotPassword(body: any) {
    return this.http.post(`${environment.apiUrl}user/forgotPassword`, body);
  }
  resetPassword(onetTimeToken: any, body: any) {
    return this.http.post(`${environment.apiUrl}user/resetPassword?token=${onetTimeToken}`, body);
  }
}
