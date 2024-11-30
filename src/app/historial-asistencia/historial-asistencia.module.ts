import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialAsistenciaPageRoutingModule } from './historial-asistencia-routing.module';

import { HistorialAsistenciaPage } from './historial-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialAsistenciaPageRoutingModule
  ],
  declarations: [HistorialAsistenciaPage]
})
export class HistorialAsistenciaPageModule {}
