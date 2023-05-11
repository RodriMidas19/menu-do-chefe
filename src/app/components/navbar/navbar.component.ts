import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  constructor(private service: UserServiceService) {}
  loginBtn: boolean = false;
  ngAfterViewInit(): void {
    const log = this.service.getUserToken();

    if (log == true) {
      this.loginBtn = true;
    } else {
      this.loginBtn = false;
    }
  }
}
