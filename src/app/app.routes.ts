import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/notFound/notFound.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ShowUsersComponent } from './Components/showUsers/showUsers.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './Guards/auth-guard';
import { EditUserComponent } from './Components/editUser/editUser.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: ShowUsersComponent },
      { path: 'dashboard', component: AdminComponent },
      { path: 'editUser/:id', component: EditUserComponent },
    ],
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
];
