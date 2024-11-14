import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordrecoveryPage } from './passwordrecovery.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordrecoveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordrecoveryPageRoutingModule {}
