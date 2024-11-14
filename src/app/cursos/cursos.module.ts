import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CursosPage } from './cursos.page';
import { CursosPageRoutingModule } from './cursos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosPageRoutingModule  // Si tienes un módulo de enrutamiento
  ],
  declarations: [CursosPage]  // Declara tu componente
})
export class CursosPageModule {}

