import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginResponse } from './login-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}
  token: any = '';
  apiUrl = 'http://localhost:3333';
  getUserToken(): boolean {
    if (localStorage.getItem('Token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  setToken(id: string) {
    localStorage.setItem('Token', id);
  }
  removeToken() {
    localStorage.removeItem('Token');
  }

  userLogin(user: any): Observable<loginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<loginResponse>(`${this.apiUrl}/login`, user, {
      headers,
    });
  }
}
