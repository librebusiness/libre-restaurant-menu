import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DishListComponent } from './dish-list/dish-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLogged = () => redirectLoggedInTo(['dashboard']);
const redirectUnauthorized = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: DishListComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectLogged } },
  { path: 'dish/:id', component: DishDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
