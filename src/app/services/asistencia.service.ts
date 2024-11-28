import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {

  private apiUrl = 'https://www.presenteprofe.cl/api/v1/estudiante/cursos/';

  constructor(private http: HttpClient) {}

  // Método para obtener la asistencia de un curso
  getAsistencia(cursoId: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any>(`${this.apiUrl}${cursoId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener la asistencia:', error);
        throw error;
      })
    );
  }
}
