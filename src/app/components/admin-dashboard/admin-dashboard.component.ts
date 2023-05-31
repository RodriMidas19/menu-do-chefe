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
  selectProduct?: Reservas;

  statuses: SelectItem[] | undefined;

  clonedProducts: { [s: string]: Funcionarios } = {};
  data: any;
  page: any = '';

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

  onRowSelect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: event.data.name,
    });
  }

  onRowUnselect(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Unselected',
      detail: event.data.name,
    });
  }
}
