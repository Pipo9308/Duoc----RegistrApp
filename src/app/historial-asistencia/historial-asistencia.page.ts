import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial-asistencia',
  templateUrl: './historial-asistencia.page.html',
  styleUrls: ['./historial-asistencia.page.scss'],
})
export class HistorialAsistenciaPage implements OnInit {
  cursoId: number | null = null; // ID del curso
  codigoClase: string = ''; // Código web de la clase
  historialAsistencia: any = {
    message: '',
    codigo: '',
    clase: {
      id: null,
      nombre: '',
      fecha: '',
    },
    total: 0,
    asistencias: [],
  }; // Estructura inicial del historial de asistencia
  errorMessage: string = ''; // Mensaje de error, si lo hubiera

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      const code = params.get('code');

      if (id && code) {
        this.cursoId = +id; // Convertir a número
        this.codigoClase = code;
        this.loadHistorialAsistencia(this.cursoId, this.codigoClase);
      }
    });
  }

  loadHistorialAsistencia(cursoId: number, codigoClase: string) {
    this.cursosService.getHistorialAsistencia(cursoId, codigoClase).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response); // Verifica que el JSON sea correcto
        if (response.message === 'Listado de asistencia a la clase') {
          this.historialAsistencia = response; // Asignar la respuesta al objeto
        } else {
          this.showAlert('Error', 'No se pudo obtener el historial de asistencia');
        }
      },
      (error) => {
        console.error('Error al obtener el historial de asistencia', error);
        this.showAlert('Error', 'Hubo un error al cargar el historial de asistencia');
      }
    );
  }

  // Mostrar una alerta con un mensaje personalizado
  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
