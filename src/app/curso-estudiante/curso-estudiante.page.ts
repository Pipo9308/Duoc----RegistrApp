import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-estudiante',
  templateUrl: './curso-estudiante.page.html',
  styleUrls: ['./curso-estudiante.page.scss'],
})
export class CursoEstudiantePage implements OnInit {

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
    private toastController: ToastController,
    private router: Router // Asegúrate de que Router esté aquí
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

  verAsistencia() {
    // Redirigir a la página de asistencia-estudiante
    this.router.navigate(['/asistencia-estudiante']);
  }

  registrarAsistencia(code: string) {
    this.cursosService.registerAsistenciaClase(code).subscribe(
      (response) => {
        if (response.message === 'Asistencia registrada con éxito') {
          this.presentToast('Asistencia registrada con éxito');
        } else if (response.message === 'Ya has registrado tu asistencia') {
          this.presentToast('Ya has registrado tu asistencia');
        }
      },
      (error) => {
        console.error('Error al registrar la asistencia', error);
        this.showAlert('Error', 'No se pudo registrar la asistencia');
      }
    );
  
}
}