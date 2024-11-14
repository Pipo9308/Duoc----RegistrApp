import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordrecoveryPageRoutingModule } from './passwordrecovery-routing.module';

import { PasswordrecoveryPage } from './passwordrecovery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordrecoveryPageRoutingModule
  ],
  declarations: [PasswordrecoveryPage]
})
export class PasswordrecoveryPageModule {}
