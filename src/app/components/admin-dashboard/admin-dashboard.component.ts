import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private service: UserServiceService,
    private router: ActivatedRoute
  ) {}
  data: any;
  page: any = '';

  ngOnInit(): void {
    this.page = this.router.snapshot.paramMap.get('nome');
    if (this.page === 'clientes') {
      this.getAllClients();
    } else if (this.page === 'funcionarios') {
      this.getAllFunc();
    }
  }

  async getAllClients() {
    await this.service.getAllClients().subscribe((res) => {
      this.data = res.recordset;
      console.log(this.data);
    });
  }

  async getAllFunc() {
    await this.service.getAllFunc().subscribe((res) => {
      this.data = res.recordset;
    });
  }
}
