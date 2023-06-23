import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private service: UserServiceService,
    private messageService: MessageService
  ) {}
  reservasData: any;
  encomendasData: any;
  produtosData: any;
  showModal: boolean = false;
  userData: any;

  nome: string = '';
  telefone: string = '';
  morada: string = '';
  email: string = '';

  ngOnInit(): void {
    this.getReservas();
    this.getEncomendas();
    this.getUserData();
  }

  async getUserData() {
    (await this.service.getUser()).subscribe((resp: any) => {
      this.userData = resp[0];
      this.nome = this.userData.nome;
      this.telefone = this.userData.telefone;
      this.morada = this.userData.morada;
      this.email = this.userData.email;
    });
  }
  async getReservas() {
    (await this.service.UserR()).subscribe((resp) => {
      this.reservasData = resp;
    });
  }
  async getEncomendas() {
    (await this.service.UserE()).subscribe((resp) => {
      this.encomendasData = resp;
    });
  }
  async getProd(id: number) {
    (await this.service.UserP(id)).subscribe((resp) => {
      this.produtosData = resp;
    });
    this.showModal = true;
  }

  async updateCliente() {
    let id = await this.service.getToken();
    let data = {
      id: id,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      morada: this.morada,
    };
    (await this.service.upClient(data)).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: this.nome,
        detail: resp.message,
      });
    });
  }
}
