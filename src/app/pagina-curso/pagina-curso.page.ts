import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-curso',
  templateUrl: './pagina-curso.page.html',
  styleUrls: ['./pagina-curso.page.scss'],
})
export class PaginaCursoPage implements OnInit {
  cursoId: number | null = null; // Almacena el id del curso
  curso: any; // Almacena los detalles del curso
  clases: any[] = []; // Almacena las clases del curso seleccionado

  fechaClase: string = '';
  horaInicioClase: string = '';
  horaTerminoClase: string = '';

  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Obtener el cursoId desde la URL
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cursoId = +id;  // Convertir el id a número
        this.loadCurso(this.cursoId);  // Cargar los detalles del curso
        this.loadClases(this.cursoId);  // Cargar las clases del curso
      }
    });
  }

  // Método para cargar los detalles del curso
  loadCurso(cursoId: number) {
    this.cursosService.getCurso(cursoId).subscribe(
      (response: any) => {
        if (response.message === 'Success') {
          this.curso = response.curso;
        }
      },
      (error: any) => {
        console.error('Error al obtener el curso', error);
      }
    );
  }

  // Método para cargar las clases del curso
  loadClases(cursoId: number) {
    this.cursosService.getClases(cursoId).subscribe(
      (response: any) => {
        if (response.message === 'Listado de clases del curso') {
          this.clases = response.clases || [];  // Asignar clases o un arreglo vacío
        } else {
          this.clases = [];  // En caso de que no haya clases, asignar un arreglo vacío
          this.showAlert('Aviso', 'No hay clases programadas para este curso');
        }
      },
      (error: any) => {
        console.error('Error al obtener las clases', error);
        this.showAlert('Error', 'No se pudieron cargar las clases');
      }
    );
  }

  // Crear una clase para un curso
  onCreateClase(cursoId: number) {
    if (cursoId === null) {
      this.presentToast('ID del curso no válido');
      return;
    }

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

  // Validar si el formulario de clase está completo
  private isClaseFormValid(): boolean {
    return this.fechaClase !== '' && this.horaInicioClase !== '' && this.horaTerminoClase !== '';
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
