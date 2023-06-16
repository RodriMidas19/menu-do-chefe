import { Component, OnInit } from '@angular/core';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  dataMenus: any;
  constructor(private service: RestauranteServiceService) {}
  ngOnInit(): void {
    this.getMenus();
  }

  async getMenus() {
    (await this.service.getAllProducts()).subscribe((resp) => {
      this.dataMenus = resp.recordset;
    });
  }
}
