import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Funcionarios } from 'src/app/services/models/models.interface';
import { RestauranteServiceService } from 'src/app/services/restaurantes/restaurante-service.service';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private service: UserServiceService,
    private rService: RestauranteServiceService,
    private router: ActivatedRoute
  ) {}
  products: Funcionarios[] = [];

  ngOnInit(): void {
    this.service.getAllFunc().subscribe((res) => {
      this.products = res.recordset;
    });
  }
}
