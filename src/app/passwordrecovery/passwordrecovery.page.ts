// passwordrecovery.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.page.html',
  styleUrls: ['./passwordrecovery.page.scss'],
})
export class PasswordrecoveryPage implements OnInit {
  correo: string = '';

  constructor(private authService: AuthService, private alertCtrl: AlertController) { }

  ngOnInit() {}

  // Método para solicitar la recuperación de contraseña
  async recoverPassword() {
    if (!this.correo) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingrese su E-mail.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.authService.recoverPassword(this.correo).subscribe(
      async (response) => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: response.message || 'Solicitud de recuperación enviada correctamente.',
          buttons: ['OK']
        });
        await alert.present();
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: error.error.message || 'Ocurrió un error durante la recuperación.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
