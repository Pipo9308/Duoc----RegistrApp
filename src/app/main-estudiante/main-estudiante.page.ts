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
  cursos: any[] = [];

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
    this.loadCursos();
  }

  loadCursos() {
    this.cursosService.getCursos().subscribe(
      (response) => {
        if (response.message === 'Success') {
          this.cursos = response.cursos;
          this.cursos.forEach((curso) => {
            this.cursosService.getClases(curso.id).subscribe(
              (clasesResponse) => {
                if (clasesResponse.message === 'Success') {
                  curso.clases = clasesResponse.clases;
                }
              },
              (error) => {
                console.error(`Error al obtener las clases del curso ${curso.id}`, error);
                curso.clases = [];
              }
            );
          });
        }
      },
      (error) => {
        console.error('Error al obtener los cursos', error);
        this.showAlert('Error', 'No se pudo cargar los cursos');
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

  // Método para navegar programáticamente a la página de asistencia
  verAsistencia(cursoId: number) {
    this.router.navigate(['/asistencia', cursoId]);
  }
}
