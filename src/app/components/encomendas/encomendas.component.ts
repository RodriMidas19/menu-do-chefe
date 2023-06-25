import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  Categorias,
  Restaurant,
  RestauranteD,
} from 'src/app/services/models/models.interface';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-encomendas',
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.scss'],
  providers: [SlicePipe],
})
export class EncomendasComponent implements OnInit {
  constructor(
    private service: RestauranteServiceService,
    private uService: UserServiceService,
    private messageService: MessageService
  ) {}
  dataProdutos: any;
  carrinho: { id: any; nome: any; preco: any; quant: number }[] = [];
  quant: number = 0;
  ngOnInit(): void {
    this.getAllProducts();
    this.getRestaurantes();
    this.getCategorias();
  }

  moradaA: any;
  modalOpen: boolean = false;
  modal() {
    console.log(this.selectedRestaurante);
    this.modalOpen = true;
  }
  categorias: Categorias[] = [];
  selectedCategoria?: Categorias | undefined;
  async getCategorias() {
    (await this.service.getCategorias()).subscribe((resp) => {
      this.categorias = resp.recordset;
    });
  }
  async compra() {
    if (
      this.selectedRestaurante == null ||
      this.selectedRestaurante == undefined
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Encomenda',
        detail: 'Selecione um Restaurante',
      });
    } else if (this.carrinho.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Encomenda',
        detail: 'Carrinho Vazio',
      });
    } else {
      let id = await this.uService.getToken();
      let precoTotal = await this.getTotalPreco();
      let data = {
        produtos: this.carrinho,
        funcionario: 'ADM',
        preco: precoTotal,
        cliente: id,
        num_restaurante: this.selectedRestaurante,
        moradaA: this.moradaA,
        situacao: 1,
      };
      (await this.uService.encomenda(data)).subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Encomenda',
          detail: resp.message,
        });
        this.modalOpen = false;
      });
    }
  }

  onCategoriaChange() {
    if (this.selectedCategoria) {
      this.getProdCat();
    } else {
      this.getAllProducts();
    }
  }

  async getProdCat() {
    if (this.selectedCategoria) {
      const cat = this.selectedCategoria.id_categoria;
      (await this.service.getCatProd(cat)).subscribe((resp) => {
        this.dataProdutos = resp.recordset.map((mesa: any) => ({
          id: mesa.id_produto,
          nome: mesa.nome_produto,
          preco: mesa.preco,
          quant: 1,
          imagem: mesa.prod_imagem,
        }));
      });
    }
  }

  async getAllProducts() {
    (await this.service.getAllProducts()).subscribe((resp) => {
      this.dataProdutos = resp.recordset;
      this.dataProdutos = this.dataProdutos.map((mesa: any) => ({
        id: mesa.id_produto,
        nome: mesa.nome_produto,
        preco: mesa.preco,
        quant: 1,
        imagem: mesa.prod_imagem,
      }));
    });
  }

  getTotalPreco(): number {
    return this.carrinho.reduce(
      (total, item) => total + item.preco * item.quant,
      0
    );
  }
  addCarrinho(data: any) {
    let preco = data.preco;
    let nome = data.nome;
    let id = data.id;
    const existingProduct = this.carrinho.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quant += 1;
    } else {
      this.carrinho.push({ id: id, nome: nome, preco: preco, quant: 1 });
    }
    console.log(this.carrinho);
  }

  removeFromCarrinho(id: any) {
    const existingProduct = this.carrinho.find((item) => item.id === id);

    if (existingProduct) {
      if (existingProduct.quant > 1) {
        existingProduct.quant -= 1;
      } else {
        const index = this.carrinho.indexOf(existingProduct);
        if (index !== -1) {
          this.carrinho.splice(index, 1);
        }
      }
    }
  }
  dataRestaurantes: Restaurant[] = [];
  restaurantes: RestauranteD[] = [];
  selectedRestaurante: any;

  async getRestaurantes() {
    (await this.service.getRestaurants()).subscribe((resp) => {
      this.dataRestaurantes = resp.recordset;
      this.restaurantes = this.dataRestaurantes.map((mesa: any) => ({
        name: mesa.nome,
        code: mesa.num_restaurante,
      }));
    });
  }
}
