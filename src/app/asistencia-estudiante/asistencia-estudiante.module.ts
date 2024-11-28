import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaEstudiantePageRoutingModule } from './asistencia-estudiante-routing.module';

import { AsistenciaEstudiantePage } from './asistencia-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaEstudiantePageRoutingModule
  ],
  declarations: [AsistenciaEstudiantePage]
})
export class AsistenciaEstudiantePageModule {}
