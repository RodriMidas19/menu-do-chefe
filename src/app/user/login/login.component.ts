import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private service: UserServiceService, private router: Router) {}

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
        this.messageEmail = response.message;
      } else {
        this.messagePassword = response.message;
      }
    });
  }
}
