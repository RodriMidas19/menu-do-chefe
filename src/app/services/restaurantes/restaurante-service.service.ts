import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RestaurantResponse,
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
}
