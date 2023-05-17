import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private service: UserServiceService) {}
  data: any;
  table: string = 'table-style';

  ngOnInit(): void {
    this.getAllClients();
  }

  async getAllClients() {
    await this.service.getAllClients().subscribe((res) => {
      this.data = res.recordset;
      console.log(this.data);
    });
  }
}
