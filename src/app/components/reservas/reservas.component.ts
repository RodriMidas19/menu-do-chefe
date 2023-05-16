import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {
  login: boolean = false;
  constructor(private service: UserServiceService) {}
  ngOnInit(): void {
    this.cheToken();
  }
  cheToken(): boolean {
    const log = this.service.verifyToken();

    if (log == true) {
      this.login = true;
      return true;
    } else {
      this.login = false;
      return false;
    }
  }
}
