import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/userServices/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private service: UserServiceService, private router: Router) {}
  adminName: any;
  data: any;
  ngOnInit(): void {
    this.getAdmin();
  }

  async getAdmin() {
    (await this.service.getAdmin()).subscribe((resp) => {
      this.data = resp.recordset[0];
      this.adminName = this.data.nome_funcionario;
    });
  }

  async userLogout() {
    await this.service.removeToken();
    this.router.navigateByUrl('/login');
  }
}
