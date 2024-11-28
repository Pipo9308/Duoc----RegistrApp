import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CursosService } from '../services/cursos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importamos el Router

@Component({
  selector: 'app-main-estudiante',
  templateUrl: './main-estudiante.page.html',
  styleUrls: ['./main-estudiante.page.scss'],
})
export class MainEstudiantePage implements OnInit {
  userName: string | null = null;
  cursosMatriculados: any[] = []; // Propiedad para cursos matriculados
  cursosDisponibles: any[] = []; // Propiedad para cursos disponibles

  constructor(
    private authService: AuthService,
    private cursosService: CursosService,
    private alertCtrl: AlertController,
    private router: Router  // Inyectamos Router para navegación programática
  ) {}

  ngOnInit() {
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });
    this.loadCursosMatriculados(); // Cargar cursos matriculados
    this.loadCursosDisponibles(); // Cargar cursos disponibles
  }

  loadCursosMatriculados() {
    const userEmail = this.userName; // Asegúrate de que esta variable contiene el correo electrónico correcto del estudiante.
    if (userEmail) {
      this.cursosService.getCursosMatriculados(userEmail).subscribe(
        (response) => {
          console.log('Respuesta de Cursos Matriculados:', response); // Verifica que la respuesta sea la esperada
          if (response.message === 'Success') {
            this.cursosMatriculados = response.cursos; // Asigna los cursos matriculados a la variable
          } else {
            this.showAlert('Error', 'No se pudieron obtener los cursos matriculados');
          }
        },
        (error) => {
          console.error('Error al obtener los cursos matriculados', error);
          this.showAlert('Error', 'No se pudo cargar la lista de cursos matriculados');
        }
      );
    }
  }

  // Cargar cursos disponibles (según el comportamiento anterior)
  loadCursosDisponibles() {
    this.cursosService.getCursos().subscribe(
      (response) => {
        if (response.message === 'Success') {
          this.cursosDisponibles = response.cursos;
        } else {
          this.showAlert('Error', 'No se pudieron obtener los cursos disponibles');
        }
      },
      (error) => {
        console.error('Error al obtener los cursos disponibles', error);
        this.showAlert('Error', 'No se pudo cargar la lista de cursos disponibles');
      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
