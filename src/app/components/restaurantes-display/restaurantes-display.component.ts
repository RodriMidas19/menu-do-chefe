import { Component, OnInit } from '@angular/core';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';
import { RestaurantResponse } from 'src/app/services/models/models.interface';

@Component({
  selector: 'app-restaurantes-display',
  templateUrl: './restaurantes-display.component.html',
  styleUrls: ['./restaurantes-display.component.scss'],
})
export class RestaurantesDisplayComponent implements OnInit {
  constructor(private service: RestauranteServiceService) {}

  ngOnInit(): void {
    this.getAllRestaurants();
  }
  data: any;

  async getAllRestaurants() {
    (await this.service.getRestaurants()).subscribe((resp) => {
      this.data = resp.recordset;
    });
  }
}
