import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import {
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
  data: any;

  dataMesas: any;
  num_mesas: [] = [];
  mesasSelected: [] = [];
  restaurante: number = 0;
  reserva: boolean = false;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.page = params.get('nome');
      if (this.page === 'clientes') {
        this.getAllClients();
      } else if (this.page === 'funcionarios') {
        this.getAllFunc();
      } else if (this.page === 'reservas') {
        this.getAllReservas();
      }
    });
  }

  async getAllClients() {
    await this.service.getAllClients().subscribe((res) => {
      this.data = res.recordset;
      console.log(this.data);
    });
  }

  async getAllFunc() {
    await this.service.getAllFunc().subscribe((res) => {
      this.products = res.recordset;
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
    (await this.rService.reservasAdm(data)).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Reserva Confirmada',
        detail: resp.message,
      });
     (await this.rService.updateReserva(this.id_reserva,2)).subscribe((resp)=>{

     })
    });
  }
  id_reserva: number = 0;
  data_reservas: string = '';
  hora_reservas: string = '';
  onRowSelect(event: any) {
    this.id_reserva = event.data.num_reserva;
    this.data_reservas = event.data.data_reserva;
    this.hora_reservas = event.data.hora_reserva;
    this.reserva = true;
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
}
