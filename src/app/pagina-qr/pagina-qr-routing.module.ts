import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaQrPage } from './pagina-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaQrPageRoutingModule {}
