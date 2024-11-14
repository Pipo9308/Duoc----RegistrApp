import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1';

  constructor(private http: HttpClient) {}

  // Crear una nueva clase para un curso
  createClase(id: number, fecha: string, horaInicio: string, horaTermino: string): Observable<any> {
    const body = { fecha, hora_inicio: horaInicio, hora_termino: horaTermino };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Asegúrate de que se esté enviando como JSON
    });

    return this.http.post<any>(`${this.apiUrl}/cursos/${id}/clase`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener los asistentes de una clase
  getAsistentesClase(id: number, code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos/${id}/clases/${code}/asistentes`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener los cursos del usuario
  getCursos(userEmail: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos?user=${userEmail}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener las clases de un curso
  getClasesCurso(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos/${id}/clase`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<any> {
    // Este manejo de error muestra un mensaje amigable para el usuario
    console.error('Ocurrió un error: ', error);
    return new Observable(observer => {
      observer.error('Hubo un error al procesar la solicitud. Por favor intente nuevamente más tarde.');
    });
  }
}
