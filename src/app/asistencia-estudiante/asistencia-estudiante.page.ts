import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';  // Asegúrate de que la ruta sea correcta
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.page.html',
  styleUrls: ['./asistencia-estudiante.page.scss'],
})
export class AsistenciaEstudiantePage implements OnInit {

  cursoId: number | null = null; // ID del curso
  asistencia: any; // Información de la asistencia
  totalClases: number = 0;
  totalAsistencias: number = 0;
  historialClases: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // Obtener el cursoId desde la URL
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cursoId = +id;  // Convertir el id a número
        this.loadAsistencia(this.cursoId);  // Cargar la asistencia del curso
      }
    });
  }

  // Método para cargar la asistencia del curso
  loadAsistencia(cursoId: number) {
    this.asistenciaService.getAsistencia(cursoId).subscribe(
      (response: any) => {
        if (response.message === 'Success') {
          this.asistencia = response;
          this.totalClases = response.total_clases;
          this.totalAsistencias = response.total_asistencias;
          this.historialClases = response.historial_clases;
        }
      },
      (error: any) => {
        console.error('Error al obtener la asistencia', error);
        this.showAlert('Error', 'No se pudo cargar la asistencia del curso');
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
}
