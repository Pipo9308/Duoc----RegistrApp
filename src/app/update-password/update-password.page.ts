import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage {

  newPassword: string = '';

  constructor(private alertCtrl: AlertController, private authService: AuthService) { }

  // Método para actualizar la contraseña
  async updatePassword() {
    const token = this.authService.getAuthToken(); // Asegúrate de que el token esté almacenado

    if (!token) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No estás autenticado, por favor inicia sesión.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.newPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor ingresa una nueva contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Hacer la solicitud para actualizar la contraseña
    
  }
}
