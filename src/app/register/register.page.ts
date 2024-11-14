import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  codigo: string = '';
  run: string = '';
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  perfil: string = ''; // Puede ser "docente" o "estudiante"

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private authService: AuthService) { }

  // Método para registrar un nuevo usuario
  async register() {
    if (!this.codigo || !this.run || !this.nombre || !this.apellido || !this.correo || !this.perfil) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Hacer la solicitud para registrar al usuario
    this.authService.registerUser(this.codigo, this.run, this.nombre, this.apellido, this.correo, this.perfil).subscribe(
      async (response) => {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: response.message,
          buttons: ['OK']
        });
        await alert.present();
        this.navCtrl.navigateForward('/login'); // Redirigir al login después del registro
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: error.message || 'Hubo un problema al registrar el usuario.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
