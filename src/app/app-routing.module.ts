import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './user/register/register.component';
import { EncomendasComponent } from './components/encomendas/encomendas.component';
import { ProfileComponent } from './components/profile/profile.component';
import { permsGuard } from './services/core/guards/perms.guard';
import { loginGuard } from './services/core/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'registo',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: ':nome', component: AdminDashboardComponent }],
    canActivate: [permsGuard],
  },
  { path: 'encomendas', component: EncomendasComponent },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [loginGuard],
  },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
