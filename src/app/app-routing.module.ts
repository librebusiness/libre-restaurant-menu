import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLogged = () => redirectLoggedInTo(['dashboard']);
const redirectUnauthorized = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'dish/:id', component: DishDetailComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectLogged } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
