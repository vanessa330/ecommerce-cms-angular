import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser(httpOptions: any) {
    return this.http.get(`${environment.apiUrl}user/get`, httpOptions);
  }
  updateStatus(body: any, httpOptions: any) {
    return this.http.patch(
      `${environment.apiUrl}user/updateStatus`,
      body,
      httpOptions
    );
  }
  updateRole(body: any, httpOptions: any) {
    return this.http.patch(
      `${environment.apiUrl}user/updateRole`,
      body,
      httpOptions
    );
  }
}
