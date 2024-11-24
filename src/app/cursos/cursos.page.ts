import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { AlertController, ToastController } from '@ionic/angular';

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
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCursos();
  }

  // Cargar los cursos desde el servicio
  loadCursos() {
    this.cursosService.getCursos().subscribe(
      (response) => {
        if (response.message === 'Success') {
          this.cursos = response.cursos;
        }
      },
      (error) => {
        console.error('Error al obtener los cursos', error);
        this.showAlert('Error', 'No se pudo cargar los cursos');
      }
    );
  }

  // Crear un nuevo curso
  onCreateCurso() {
    if (this.isCursoFormValid()) {
      this.cursosService.createCurso(this.nombreCurso, this.siglaCurso, this.institucionCurso, this.descripcionCurso).subscribe(
        async (response) => {
          if (response.message === 'Curso creado exitosamente') {
            await this.presentToast('Curso creado exitosamente');
            this.resetCursoForm();
            this.loadCursos();
          }
        },
        async (error) => {
          console.error('Error al crear el curso', error);
          await this.presentToast('Hubo un error al crear el curso');
        }
      );
    } else {
      this.presentToast('Por favor, complete todos los campos');
    }
  }

  // Crear una nueva clase para un curso
  onCreateClase(cursoId: number) {
    if (this.isClaseFormValid()) {
      // Validar que la hora de inicio sea anterior a la hora de término
      if (this.horaInicioClase >= this.horaTerminoClase) {
        this.presentToast('La hora de inicio debe ser anterior a la hora de término');
        return;
      }

      this.cursosService.createClase(cursoId, this.fechaClase, this.horaInicioClase, this.horaTerminoClase).subscribe(
        async (response) => {
          if (response.message === 'Clase creada exitosamente') {
            await this.presentToast('Clase creada exitosamente');
            this.resetClaseForm();
          }
        },
        async (error) => {
          console.error('Error al crear la clase', error);
          await this.presentToast('Hubo un error al crear la clase');
        }
      );
    } else {
      this.presentToast('Por favor, complete todos los campos de la clase');
    }
  }

  // Método para guardar la clase utilizando onCreateClase
  onSaveClase() {
    const selectedCursoId = this.getSelectedCursoId();
    if (selectedCursoId !== null) {
      this.onCreateClase(selectedCursoId);
    } else {
      this.presentToast('Seleccione un curso válido para crear la clase');
    }
  }

  // Obtener el ID del curso seleccionado (ejemplo de implementación)
  private getSelectedCursoId(): number | null {
    return this.cursos.length ? this.cursos[0].id : null;
  }

  // Validar si el formulario del curso está completo
  private isCursoFormValid(): boolean {
    return this.nombreCurso !== '' && this.siglaCurso !== '' && this.institucionCurso !== '' && this.descripcionCurso !== '';
  }

  // Validar si el formulario de la clase está completo
  private isClaseFormValid(): boolean {
    return this.fechaClase !== '' && this.horaInicioClase !== '' && this.horaTerminoClase !== '';
  }

  // Limpiar los campos del formulario de curso
  resetCursoForm() {
    this.nombreCurso = '';
    this.siglaCurso = '';
    this.institucionCurso = '';
    this.descripcionCurso = '';
  }

  // Limpiar los campos del formulario de clase
  resetClaseForm() {
    this.fechaClase = '';
    this.horaInicioClase = '';
    this.horaTerminoClase = '';
  }

  // Mostrar una alerta con un mensaje personalizado
  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Mostrar un toast con un mensaje personalizado
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
