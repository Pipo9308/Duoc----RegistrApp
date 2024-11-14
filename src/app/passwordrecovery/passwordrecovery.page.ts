import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importar el servicio de autenticación
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.page.html',
  styleUrls: ['./passwordrecovery.page.scss'],
})
export class PasswordrecoveryPage implements OnInit {
  correo: string = ''; // Variable para almacenar el correo

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
        // Si la solicitud es exitosa
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: response.message,
          buttons: ['OK']
        });
        await alert.present();
      },
      async (error) => {
        // Manejo de errores
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
