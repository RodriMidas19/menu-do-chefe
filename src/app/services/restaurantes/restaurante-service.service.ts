import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantResponse } from '../userServices/login-response.interface';

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
}
