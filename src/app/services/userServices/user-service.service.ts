import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ClientesResponse,
  FuncionariosResponse,
  loginResponse,
  reservas,
} from '../models/models.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  token: any = '';
  apiUrl = 'http://localhost:3333';
  verifyToken(): boolean {
    if (localStorage.getItem('Token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): any {
    this.token = localStorage.getItem('Token');
    return this.token;
  }
  setToken(id: string) {
    localStorage.setItem('Token', id);
  }
  async removeToken() {
    await localStorage.removeItem('Token');
    this.router.navigateByUrl('/login');
  }

  userLogin(user: any): Observable<loginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<loginResponse>(`${this.apiUrl}/login`, user, {
      headers,
    });
  }

  getAllClients() {
    return this.http.get<ClientesResponse>(`${this.apiUrl}/clientes`);
  }

  async deleteClient(id: number) {
    return await this.http.delete<reservas>(
      `${this.apiUrl}/deleteClient/${id}`
    );
  }

  getAllFunc() {
    return this.http.get<FuncionariosResponse>(`${this.apiUrl}/funcionarios`);
  }

  async updateFunc(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return await this.http.put<reservas>(`${this.apiUrl}/updateFunc`, data, {
      headers,
    });
  }

  async deleteFunc(id: any) {
    return await this.http.delete<reservas>(`${this.apiUrl}/deleteFunc/${id}`);
  }
}
