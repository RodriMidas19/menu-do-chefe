import { Component } from '@angular/core';
import { UserServiceService } from '../services/userServices/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private service: UserServiceService) {}
  data: any;
  getAllClients() {
    this.data = this.service.getAllClients();
  }
}
