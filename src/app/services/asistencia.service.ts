import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {

  private apiUrl = 'https://www.presenteprofe.cl/api/v1/estudiante/cursos/';  // URL base para obtener las asistencias

  constructor(private http: HttpClient) {}

  // Método para obtener la asistencia de un curso
  obtenerAsistenciaCurso(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${cursoId}`);
  }
}
