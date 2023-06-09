import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {
  login: boolean = false;
  restaurantes: any;
  selectedRestaurante: any;
  nPessoas: number = 0;
  restaurante: any;
  errorMessage: string | undefined;
  hora: any;
  dataReserva: any;
  horas: any[] = [
    {name:'12:00',code:'12:00'},
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];
  constructor(
    private service: UserServiceService,
    private restauranteService: RestauranteServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cheToken();
    this.getRestaurantes();
  }
  cheToken(): boolean {
    const log = this.service.verifyToken();

    if (log == true) {
      this.login = true;
      this.getRestaurantes();
      return true;
    } else {
      this.login = false;
      return false;
    }
  }

  async getRestaurantes() {
    this.restaurante = [
      { name: 'MC01', code: 1 },
      { name: 'MC02', code: 2 },
      { name: 'MC03', code: 3 },
      { name: 'MC04', code: 4 },
      { name: 'MC05', code: 5 },
    ];
  }

  async reservarMesa() {
    let id = await this.service.getToken();
    let data = {
      num_restaurante: this.restaurante,
      num_pessoas: this.nPessoas,
      data_reserva: this.dataReserva,
      situacao: 0,
      hora_reserva: this.hora,
      id_cliente: id,
    };
    if (new Date() > this.dataReserva) {
      this.messageService.add({
        severity: 'error',
        summary: 'Data',
        detail: 'Data não é válida',
      });
    } else {
      (await this.restauranteService.createReserva(data)).subscribe((resp) => {
        console.log(resp.message);
        this.messageService.add({
          severity: 'success',
          summary: 'Reserva',
          detail: resp.message,
        });
      });
    }
  }
}
