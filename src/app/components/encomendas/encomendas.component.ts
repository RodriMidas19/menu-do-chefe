import { Component, OnInit } from '@angular/core';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';

@Component({
  selector: 'app-encomendas',
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.scss'],
})
export class EncomendasComponent implements OnInit {
  constructor(private service: RestauranteServiceService) {}
  dataProdutos: any;
  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    (await this.service.getAllProducts()).subscribe((resp) => {
      this.dataProdutos = resp.recordset;
      console.log(this.dataProdutos);
    });
  }
}
