import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  ReservasD,
  Restaurant,
  RestauranteD,
} from 'src/app/services/models/models.interface';
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
  restaurante: [] = [];
  errorMessage: string | undefined;
  hora: any;
  dataReserva: any;
  horas: ReservasD[] = [
    { name: '12:00', code: '12:00' },
    { name: '13:00', code: '13:00' },
    { name: '14:00', code: '14:00' },
    { name: '15:00', code: '15:00' },
    { name: '16:00', code: '16:00' },
    { name: '17:00', code: '17:00' },
    { name: '18:00', code: '18:00' },
    { name: '19:00', code: '19:00' },
    { name: '20:00', code: '20:00' },
    { name: '21:00', code: '21:00' },
    { name: '22:00', code: '22:00' },
  ];
  dataRestaurantes: Restaurant[] = [];
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
    (await this.restauranteService.getRestaurants()).subscribe((resp) => {
      this.dataRestaurantes = resp.recordset;
      this.restaurantes = this.dataRestaurantes.map((mesa: any) => ({
        name: mesa.nome,
        code: mesa.num_restaurante,
      }));
    });
  }

  async reservarMesa() {
    let id = await this.service.getToken();
    let data = {
      num_restaurante: this.restaurante,
      num_pessoas: this.nPessoas,
      data_reserva: this.dataReserva,
      situacao: 0,
      hora_reserva: this.hora.code,
      id_cliente: id,
    };
    if (new Date() > new Date(this.dataReserva + ' ' + this.hora.code)) {
      console.log('nao da ');
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
