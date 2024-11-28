import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private authService: AuthService) { }

  ngOnInit() {}

  async login() {
    if (this.loading) return; // Evitar múltiples clics
    this.loading = true; // Iniciar carga

    // Intentar iniciar sesión
    this.authService.login(this.username, this.password).subscribe(
      async (response) => {
        this.loading = false; // Detener carga

        // Verificar si la respuesta es exitosa
        if (response.message === 'Success' && response.auth && response.auth.token) {
          this.authService.setAuthToken(response.auth.token);
          this.authService.setUserName(this.username);
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario y/o contraseña incorrectos, por favor intente nuevamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error) => {
        this.loading = false; // Detener carga

        let errorMessage = 'Ocurrió un error al iniciar sesión.';
        if (error.status === 0) {
          errorMessage = 'Error de red. Por favor, verifica tu conexión a Internet.';
        } else if (error.status === 404) {
          errorMessage = 'Servicio no encontrado. Por favor, contacta al soporte.';
        }

        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: errorMessage,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
