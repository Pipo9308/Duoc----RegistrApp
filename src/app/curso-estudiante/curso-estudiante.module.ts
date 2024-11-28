import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoEstudiantePageRoutingModule } from './curso-estudiante-routing.module';

import { CursoEstudiantePage } from './curso-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoEstudiantePageRoutingModule
  ],
  declarations: [CursoEstudiantePage]
})
export class CursoEstudiantePageModule {}
