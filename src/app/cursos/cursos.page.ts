import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: any[] = [];  // Almacena la lista de cursos
  curso: any;  // Almacena los detalles de un curso específico
  clases: any[] = [];  // Almacena las clases de un curso
  asistentes: any[] = [];  // Almacena los asistentes de una clase
  userEmail: string = '';  // El correo del usuario, lo recuperamos del servicio de autenticación

  fechaClase: string = '';  // Fecha de la nueva clase
  horaInicio: string = '';  // Hora de inicio de la clase
  horaTermino: string = '';  // Hora de término de la clase
  claseCodigo: string = '';  // Código de la clase para obtener los asistentes

  constructor(
    private cursosService: CursosService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Recuperar el correo del usuario desde el servicio de autenticación
    this.userEmail = this.authService.getUserName() || '';

    // Cargar los cursos del usuario
    this.loadCursos();
  }

  // Cargar los cursos del usuario
  loadCursos() {
    this.cursosService.getCursos(this.userEmail).subscribe(
      (response) => {
        if (response.message === 'Success') {
          this.cursos = response.cursos;  // Guardar los cursos en la variable
        }
      },
      (error) => {
        console.error('Error al obtener los cursos', error);
      }
    );
  }

  // Crear una nueva clase para un curso
  onCreateClase(id: number) {
    if (this.fechaClase && this.horaInicio && this.horaTermino) {
      this.cursosService.createClase(id, this.fechaClase, this.horaInicio, this.horaTermino).subscribe(
        async (response) => {
          if (response.message === 'Clase creada exitosamente') {
            console.log('Clase creada con éxito');
            const alert = await this.alertCtrl.create({
              header: 'Éxito',
              message: 'Clase creada exitosamente',
              buttons: ['OK']
            });
            await alert.present();
            this.loadClases(id);  // Recargar las clases después de crear la clase
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
      console.error('Por favor, complete todos los campos');
      this.showErrorAlert('Por favor, complete todos los campos');
    }
  }

  // Obtener los asistentes de una clase
  onGetAsistentes(id: number) {
    this.cursosService.getAsistentesClase(id, this.claseCodigo).subscribe(
      (response) => {
        if (response.message === 'Listado de asistencia a la clase') {
          this.asistentes = response.asistencias;  // Guardar la lista de asistentes
        }
      },
      (error) => {
        console.error('Error al obtener los asistentes', error);
      }
    );
  }

  // Cargar las clases de un curso
  loadClases(id: number) {
    this.cursosService.getClasesCurso(id).subscribe(
      (response) => {
        if (response.message === 'Listado de clases del curso') {
          this.clases = response.clases;  // Guardar las clases del curso
        }
      },
      (error) => {
        console.error('Error al obtener las clases', error);
      }
    );
  }

  // Mostrar un mensaje de error
  async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
