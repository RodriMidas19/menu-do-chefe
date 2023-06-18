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
  carrinho: [] = [];
  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    (await this.service.getAllProducts()).subscribe((resp) => {
      this.dataProdutos = resp.recordset;
      console.log(this.dataProdutos);
    });
  }
  
  addCarrinho(data:any){
    let preco = data.preco;
    let nome = data.nome_produto;
    let id = data.id_produto;
  }
}
