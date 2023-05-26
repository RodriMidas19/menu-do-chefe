import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private service: UserServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}

  userEmail: string = '';
  userPassword: string = '';
  messageEmail: string = '';
  messagePassword: string = '';
  async userLogin() {
    let user = { email: this.userEmail, password: this.userPassword };

    await this.service.userLogin(user).subscribe((response) => {
      if (response.message == 'Login realizado com sucesso') {
        this.service.setToken(response.id);
        this.router.navigateByUrl('/home');
      } else if (response.message == 'Email não existe.') {
        this.messageService.add({
          key: 'tr',
          severity: 'success',
          summary: 'Sucesso',
          detail: response.message,
        });
        this.messageEmail = response.message;
      } else {
        this.messagePassword = response.message;
      }
    });
  }
}
