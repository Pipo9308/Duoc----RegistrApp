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

  // Variables para la clase
  fechaClase: string = '';
  horaInicioClase: string = '';
  horaTerminoClase: string = '';

  constructor(
    private cursosService: CursosService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
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
            this.resetCursoForm();
            this.loadCursos();
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

  onCreateClase(cursoId: number) {
    if (this.fechaClase && this.horaInicioClase && this.horaTerminoClase) {
      this.cursosService.createClase(cursoId, this.fechaClase, this.horaInicioClase, this.horaTerminoClase).subscribe(
        async (response) => {
          if (response.message === 'Clase creada exitosamente') {
            const alert = await this.alertCtrl.create({
              header: 'Éxito',
              message: 'Clase creada exitosamente',
              buttons: ['OK']
            });
            await alert.present();
            this.resetClaseForm(); // Limpiar formulario de clase
          }
        },
        async (error) => {
          console.error('Error al crear la clase', error);
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Hubo un error al crear la clase',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      this.showErrorAlert('Por favor, complete todos los campos de la clase');
    }
  }

  resetCursoForm() {
    this.nombreCurso = '';
    this.siglaCurso = '';
    this.institucionCurso = '';
    this.descripcionCurso = '';
  }

  resetClaseForm() {
    this.fechaClase = '';
    this.horaInicioClase = '';
    this.horaTerminoClase = '';
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
