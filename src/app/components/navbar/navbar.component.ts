import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';

export interface IsActiveMatchOptions {
  matrixParams: 'exact' | 'subset' | 'ignored';
  queryParams: 'exact' | 'subset' | 'ignored';
  paths: 'exact' | 'subset';
  fragment: 'exact' | 'ignored';
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public linkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };
  constructor(private service: UserServiceService) {}
  loginBtn: boolean = false;
  ngOnInit(): void {
    this.cheToken();
  }
  cheToken(): boolean {
    const log = this.service.getUserToken();

    if (log == true) {
      this.loginBtn = true;
      return true;
    } else {
      this.loginBtn = false;
      return false;
    }
  }
  async userLogout() {
    await this.service.removeToken();
  }
}
