import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  cursoId: number | null = null;
  asistencia: any;

  constructor(
    private route: ActivatedRoute,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    // Obtener el cursoId desde la URL usando 'cursoId' (que es el nombre del parámetro en la ruta)
    const cursoIdParam = this.route.snapshot.paramMap.get('cursoId');
    
    if (cursoIdParam) {
      this.cursoId = +cursoIdParam;  // Convertir el ID a número
      console.log('Curso ID:', this.cursoId); // Verifica el ID recibido

      this.obtenerAsistencia();
    } else {
      console.error('No se encontró el parámetro "cursoId" en la URL');
    }
  }

  obtenerAsistencia() {
    if (this.cursoId !== null) {
      this.asistenciaService.obtenerAsistenciaCurso(this.cursoId).subscribe({
        next: (data) => {
          this.asistencia = data;
          console.log('Asistencia del curso:', this.asistencia);
        },
        error: (err) => {
          console.error('Error al obtener la asistencia:', err);
        }
      });
    } else {
      console.error('El curso ID no es válido');
    }
  }
}
