import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
import {
  Funcionarios,
  Produto,
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
  visible: boolean = false;
  reserva: boolean = false;
  cliente: boolean = false;
  funcionario: boolean = false;
  menu: boolean = false;

  dataClientes: any;
  dataFuncionarios: any;
  cargos: any;
  selectedCargo: any;
  iscargo: boolean = true;

  dataMesas: any;
  num_mesas: [] = [];
  mesasSelected: [] = [];
  restaurante: number = 0;
  nPessoas: number = 0;

  num_func: string = '';
  nomeFunc: string = '';
  idadeFunc: number = 0;
  telefoneFunc: string = '';
  emailFunc: string = '';
  cargosFunc: [] = [];
  cargosData: any;
  cargo: any;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.page = params.get('nome');
      if (this.page === 'clientes') {
        this.cliente = true;
        this.reserva = false;
        this.funcionario = false;
        this.menu = false;
        this.getAllClients();
      } else if (this.page === 'funcionarios') {
        this.funcionario = true;
        this.reserva = false;
        this.cliente = false;
        this.menu = false;
        this.getAllFunc();
      } else if (this.page === 'reservas') {
        this.reserva = true;
        this.cliente = false;
        this.funcionario = false;
        this.menu = false;
        this.getAllReservas();
      } else if (this.page === 'menus') {
        this.reserva = false;
        this.cliente = false;
        this.funcionario = false;
        this.menu = true;
        this.getAllProducts();
      }
    });
  }

  async getAllClients() {
    await this.service.getAllClients().subscribe((res) => {
      this.dataClientes = res.recordset;
      console.log(this.dataClientes);
    });
  }
  async deleteClient(id: number) {
    (await this.service.deleteClient(id)).subscribe((resp) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Cliente',
        detail: resp.message,
      });
    });
  }

  async getAllFunc() {
    this.cargos = [
      { name: 'admin', code: 1 },
      { name: 'Empregado de Mesa', code: 2 },
      { name: 'Cozinheiro', code: 3 },
    ];
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

  async showDialog(data: any) {
    this.visible = true;
    this.num_func = data.num_funcionario;
    this.nomeFunc = data.nome_funcionario;
    this.emailFunc = data.email;
    this.idadeFunc = data.idade;
    this.telefoneFunc = data.telefone;
    this.cargo = data.cargo.code;

    (await this.rService.getCargos()).subscribe((resp) => {
      this.cargosData = resp.recordset;
      this.cargosFunc = this.cargosData.map((cargo: any) => ({
        name: cargo.nome_cargo,
        code: cargo.id_cargo,
      }));
    });
  }

  async UpdateFunc() {
    let data = {
      num: this.num_func,
      nome: this.nomeFunc,
      idade: this.idadeFunc,
      telefone: this.telefoneFunc,
      email: this.emailFunc,
      cargo: this.cargo.code,
    };
    console.log(this.cargo);
    (await this.service.updateFunc(data)).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Funcionário',
        detail: resp.message,
      });
      this.visible = false;
    });
  }

  async deleteFunc(id: any) {
    (await this.service.deleteFunc(id)).subscribe((resp) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Funcionário',
        detail: resp.message,
      });
    });
  }

  //Menus
  dataMenus: Produto[] = [];
  myImage!: Observable<any>;
  base64Code!: any;
  file: any;

  nome_prod: string = '';
  preco: number = 0;
  disponivel: number = 1;
  menuModal: boolean = false;

  async confirmProduct() {
    this.menuModal = false;

    await this.convertTo64(this.file);
  }
  async addProduct(file: any) {
    let data = {
      nome: this.nome_prod,
      preco: this.preco,
      disponivel: this.disponivel,
      img: file,
    };
    (await this.rService.addProduct(data)).subscribe((resp) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Produto',
        detail: resp.message,
      });
    });
  }

  async onUpload(event: any) {
    this.file = event.files[0];
  }
  async convertTo64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    await observable.subscribe((d) => {
      this.addProduct(d);
    });
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  getSeverity(status: number): string {
    switch (status) {
      case 1:
        return 'success';
      case 0:
        return 'warning';
      default:
        return 'low';
    }
  }

  async getAllProducts() {
    (await this.rService.getAllProducts()).subscribe((resp) => {
      this.dataMenus = resp.recordset;
      console.log(this.dataMenus);
    });
  }

  openModal() {
    this.menuModal = true;
  }
}
