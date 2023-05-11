import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: UserServiceService) {}
  loginBtn: boolean = false;
  ngOnInit(): void {
    const log = this.service.getUserToken();

    if (log == true) {
      this.loginBtn = true;
    } else {
      this.loginBtn = false;
    }
  }
}
