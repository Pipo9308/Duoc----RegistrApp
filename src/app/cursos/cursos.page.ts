// cursos.page.ts
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: any[] = [];
  nombreCurso: string = '';
  siglaCurso: string = '';
  institucionCurso: string = '';
  descripcionCurso: string = '';

  constructor(
    private cursosService: CursosService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
    // Llamar a getCursos sin pasar el argumento userEmail
    this.cursosService.getCursos().subscribe(
      (response) => {
        if (response.message === 'Success') {
          this.cursos = response.cursos;
        }
      },
      (error) => {
        console.error('Error al obtener los cursos', error);
      }
    );
  }

  onCreateCurso() {
    if (this.nombreCurso && this.siglaCurso && this.institucionCurso && this.descripcionCurso) {
      this.cursosService.createCurso(this.nombreCurso, this.siglaCurso, this.institucionCurso, this.descripcionCurso).subscribe(
        async (response) => {
          if (response.message === 'Curso creado exitosamente') {
            const alert = await this.alertCtrl.create({
              header: 'Éxito',
              message: 'Curso creado exitosamente',
              buttons: ['OK']
            });
            await alert.present();
            this.resetCursoForm();  // Limpiar formulario
            this.loadCursos();  // Recargar la lista de cursos
          }
        },
        async (error) => {
          console.error('Error al crear el curso', error);
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Hubo un error al crear el curso',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      this.showErrorAlert('Por favor, complete todos los campos');
    }
  }

  resetCursoForm() {
    this.nombreCurso = '';
    this.siglaCurso = '';
    this.institucionCurso = '';
    this.descripcionCurso = '';
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

