import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaCursoPage } from './pagina-curso.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaCursoPageRoutingModule {}
