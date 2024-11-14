import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';
import { PasswordrecoveryPage } from '../passwordrecovery/passwordrecovery.page';
import { RegisterPage } from '../register/register.page';
import { LoginPage } from './login.page';
import { MainPagePage } from '../main-page/main-page.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'password-recovery',
    component: PasswordrecoveryPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'main-page',
    component: MainPagePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
