import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestauranteServiceService {
  constructor(private http: HttpClient) {}

  async getRestaurants() {
    return await this.http.get('http://localhost:3333/restaurantes');
  }
}
