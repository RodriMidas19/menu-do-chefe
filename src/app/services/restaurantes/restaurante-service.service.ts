import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RestaurantResponse,
  mesasResponse,
  reservas,
  reservasResponse,
} from '../models/models.interface';

@Injectable({
  providedIn: 'root',
})
export class RestauranteServiceService {
  constructor(private http: HttpClient) {}

  async getRestaurants() {
    return await this.http.get<RestaurantResponse>(
      'http://localhost:3333/restaurantes'
    );
  }

  async createReserva(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this.http.post<reservas>(
      'http://localhost:3333/reservaCliente',
      data,
      {
        headers,
      }
    );
  }

  async getReservas() {
    return await this.http.get<reservasResponse>(
      'http://localhost:3333/reservas'
    );
  }

  async getMesas(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return await this.http.post<mesasResponse>(
      'http://localhost:3333/mesas',
      data,
      { headers }
    );
  }

  async reservasAdm(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return await this.http.post<reservas>(
      'http://localhost:3333/reservasAdm',
      data,
      { headers }
    );
  }

  async updateReserva(id: any, status: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log(id + ' ' + status);
    let data = { id: id, status: status };
    return await this.http.put<reservas>(
      `http://localhost:3333/Upreservas`,
      data,
      { headers }
    );
  }

  async deleteReserva(id: any) {
    return await this.http.delete<reservas>(
      `http://localhost:3333/reservas/${id}`
    );
  }
}
