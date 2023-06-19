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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Prime NG
import { TableModule } from 'primeng/table';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { EncomendasComponent } from './components/encomendas/encomendas.component';
import { PaginatorModule } from 'primeng/paginator';

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
    EncomendasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({ MenuIcon, User2, Book, BookDown }),
    FormsModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    TagModule,
    DropdownModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    DialogModule,
    FileUploadModule,
    CardModule,
    PaginatorModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
