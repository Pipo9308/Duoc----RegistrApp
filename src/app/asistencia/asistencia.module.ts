import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AsistenciaPage } from './asistencia.page';
import { AsistenciaService } from '../services/asistencia.service';  // Ajusta la ruta según tu estructura


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AsistenciaPage],
  providers: [AsistenciaService],  // Asegúrate de agregar el servicio aquí si no está en el root
})
export class AsistenciaPageModule {}
