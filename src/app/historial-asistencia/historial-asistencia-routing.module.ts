import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialAsistenciaPage } from './historial-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialAsistenciaPageRoutingModule {}
