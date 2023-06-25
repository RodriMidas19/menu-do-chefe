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
  constructor(
    private User: UserServiceService,
    private restaurante: RestauranteServiceService,
    private messageService: MessageService
  ) {}
  restaurantesData: Restaurant[] = [];
  selectedRestaurante?: Restaurant;
  nPessoas: number = 0;
  hora: any;
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
  login: boolean = false;
  dataReserva: any;
  ngOnInit(): void {
    this.cheToken();
    this.getRestaurantes();
  }

  cheToken(): boolean {
    const log = this.User.verifyToken();

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
    (await this.restaurante.getRestaurants()).subscribe((resp) => {
      this.restaurantesData = resp.recordset;
    });
  }

  async reservarMesa() {
    console.log(this.selectedRestaurante);
    console.log(this.hora)
    let id = await this.User.getToken();
      console.log(this.selectedRestaurante);
      let data = {
        num_restaurante: this.selectedRestaurante,
        num_pessoas: this.nPessoas,
        data_reserva: this.dataReserva,
        situacao: 0,
        hora_reserva: this.hora,
        id_cliente: id,
      };
      if (new Date() > new Date(this.dataReserva + ' ' + this.hora)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Reserva',
          detail: 'Data não válida',
        });
      } else {
        (await this.restaurante.createReserva(data)).subscribe(
          (resp) => {
            console.log(resp.message);
            this.messageService.add({
              severity: 'success',
              summary: 'Reserva',
              detail: resp.message,
            });
          }
        );
   
    }
  }
}
