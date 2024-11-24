import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaCursoPageRoutingModule } from './pagina-curso-routing.module';

import { PaginaCursoPage } from './pagina-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaCursoPageRoutingModule
  ],
  declarations: [PaginaCursoPage]
})
export class PaginaCursoPageModule {}
