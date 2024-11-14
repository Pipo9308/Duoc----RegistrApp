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

    console.log('Correo enviado:', this.correo); // Para verificar el correo antes de la solicitud

    
  }
}
