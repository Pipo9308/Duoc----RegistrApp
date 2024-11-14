import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaQrPageRoutingModule } from './pagina-qr-routing.module';

import { PaginaQrPage } from './pagina-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaQrPageRoutingModule
  ],
  declarations: [PaginaQrPage]
})
export class PaginaQrPageModule {}
