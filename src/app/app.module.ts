import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  LucideAngularModule,
  MenuIcon,
  User2,
  Book,
  BookDown,
} from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RestaurantesDisplayComponent } from './components/restaurantes-display/restaurantes-display.component';
import { AboutComponent } from './components/about/about.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminComponent } from './admin/admin.component';

//Prime NG
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RestaurantesDisplayComponent,
    AboutComponent,
    ReservasComponent,
    RegisterComponent,
    AdminComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({ MenuIcon, User2, Book, BookDown }),
    FormsModule,
    HttpClientModule,
    TableModule,
    TabViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
