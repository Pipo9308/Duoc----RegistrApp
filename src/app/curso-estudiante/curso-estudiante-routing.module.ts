import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoEstudiantePage } from './curso-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: CursoEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoEstudiantePageRoutingModule {}
