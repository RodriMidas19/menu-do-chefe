import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Funcionarios } from 'src/app/services/models/models.interface';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private service: UserServiceService,
    private rService: RestauranteServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  date: string = '';
  morada: string = '';
  password: string = '';
  ngOnInit(): void {}

  async userRegister() {
    let data = {
      nome: this.userName,
      data_nasc: this.date,
      telefone: this.userPhone,
      morada: this.morada,
      email: this.userEmail,
      password: this.password,
    };

    await this.service.userRegister(data).subscribe((resp) => {
      this.router.navigateByUrl('/login');
    });
  }
}
