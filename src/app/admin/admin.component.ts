import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/userServices/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private service: UserServiceService) {}
  adminName: any;
  data: any;
  ngOnInit(): void {
    this.getAdmin();
  }

  async getAdmin() {
    (await this.service.getAdmin()).subscribe((resp) => {
      this.data = resp.recordset;
    });
  }
}
