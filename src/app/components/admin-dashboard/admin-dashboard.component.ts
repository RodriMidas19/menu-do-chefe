import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import {
  Clients,
  Funcionarios,
  Reservas,
} from 'src/app/services/models/models.interface';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private service: UserServiceService,
    private rService: RestauranteServiceService,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  products: Funcionarios[] = [];

  dataReservas: Reservas[] = [];
  selectedProduct?: Reservas;

  page: any = '';
  reserva: boolean = false;
  cliente: boolean = false;
  funcionario: boolean = false;

  dataClientes: any;
  dataFuncionarios: any;

  dataMesas: any;
  num_mesas: [] = [];
  mesasSelected: [] = [];
  restaurante: number = 0;
  nPessoas: number = 0;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.page = params.get('nome');
      if (this.page === 'clientes') {
        this.cliente = true;
        this.getAllClients();
      } else if (this.page === 'funcionarios') {
        this.funcionario = true;
        this.getAllFunc();
      } else if (this.page === 'reservas') {
        this.reserva = true;
        this.getAllReservas();
      }
    });
  }

  async getAllClients() {
    await this.service.getAllClients().subscribe((res) => {
      this.dataClientes = res.recordset;
      console.log(this.dataClientes);
    });
  }

  async getAllFunc() {
    await this.service.getAllFunc().subscribe((res) => {
      this.dataFuncionarios = res.recordset;
    });
  }

  async getAllReservas() {
    (await this.rService.getReservas()).subscribe((resp) => {
      this.dataReservas = resp.recordset;
      console.log(this.dataReservas);
    });
  }

  async confirm() {
    let data = {
      num_mesa: this.mesasSelected,
      id_reserva: this.id_reserva,
      data_reserva: this.data_reservas,
      hora_reserva: this.hora_reservas,
    };
    if (this.mesasSelected.length < this.nPessoas / 2) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Mesas',
        detail: 'Número de mesas insuficientes',
      });
    } else {
      (await this.rService.reservasAdm(data)).subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Reserva Confirmada',
          detail: resp.message,
        });
        this.UpdateStatus(this.id_reserva, 2);
      });
    }
  }
  async CancelReserva() {
    this.UpdateStatus(this.id_reserva, 3);
  }
  async deleteReserva() {
    (await this.rService.deleteReserva(this.id_reserva)).subscribe((resp) => {
      this.messageService.add({
        severity: 'error',
        summary: resp.message,
        detail: resp.message,
      });
      this.UpdateStatus(this.id_reserva, 3);
    });
  }

  async UpdateStatus(id_reserva: number, status: number) {
    (await this.rService.updateReserva(id_reserva, status)).subscribe(
      (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: `Reserva ${this.id_reserva} Atualizada.`,
          detail: resp.message,
        });
      }
    );
  }
  id_reserva: number = 0;
  data_reservas: string = '';
  hora_reservas: string = '';
  onRowSelect(event: any) {
    this.id_reserva = event.data.num_reserva;
    this.data_reservas = event.data.data_reserva;
    this.hora_reservas = event.data.hora_reserva;
    this.reserva = true;
    this.nPessoas = event.data.num_pessoas;
    this.messageService.add({
      severity: 'info',
      summary: 'Reserva selecionada',
      detail: event.data.nomeCliente,
    });
    if (event.data.nome == 'MC01') {
      this.restaurante = 1;
    } else if (event.data.nome == 'MC02') {
      this.restaurante = 2;
    } else if (event.data.nome == 'MC03') {
      this.restaurante = 3;
    } else if (event.data.nome == 'MC04') {
      this.restaurante = 4;
    } else if (event.data.nome == 'MC05') {
      this.restaurante = 5;
    }
    let data = {
      hora: event.data.hora_reserva,
      data: event.data.data_reserva,
      restaurante: this.restaurante,
    };
    this.getMesas(data);
  }
  onRowUnselect(event: any) {
    this.reserva = false;
    this.num_mesas = [];
  }
  async getMesas(data: any) {
    (await this.rService.getMesas(data)).subscribe((resp) => {
      this.dataMesas = resp.recordset;
      this.num_mesas = this.dataMesas.map((mesa: any) => ({
        name: mesa.num_mesa,
        code: mesa.num_mesa,
      }));
    });
  }

  onRowEditInit(product: Clients) {}

  onRowEditSave(product: Clients) {}

  onRowEditCancel(product: Clients, index: number) {}
}
