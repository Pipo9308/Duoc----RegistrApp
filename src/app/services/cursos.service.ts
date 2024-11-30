import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1'; // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  // Método para obtener todos los cursos
  getCursos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear un curso
  createCurso(nombre: string, sigla: string, institucion: string, descripcion: string): Observable<any> {
    const body = { nombre, sigla, institucion, descripcion };
    return this.http.post<any>(`${this.apiUrl}/cursos`, body).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear una nueva clase en un curso específico
  createClase(id: number, fecha: string, hora_inicio: string, hora_termino: string): Observable<any> {
    const body = { fecha, hora_inicio, hora_termino };
    const url = `${this.apiUrl}/cursos/${id}/clase`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un curso por su ID
  getCurso(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos/${cursoId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener las clases de un curso
  getClases(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cursos/${cursoId}/clase`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener la asistencia de un curso por su ID
  getAsistenciaCurso(cursoId: number): Observable<any> {
    const url = `${this.apiUrl}/estudiante/cursos/${cursoId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para registrar la asistencia de un estudiante en una clase específica
  registerAsistenciaClase(code: string): Observable<any> {
    const url = `${this.apiUrl}/clases/${code}/asistencia`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // El token de autenticación
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(url, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener los cursos matriculados de un estudiante (por su email)
  getCursosMatriculados(userEmail: string): Observable<any> {
    const url = `${this.apiUrl}/estudiante/cursos?user=${userEmail}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<any> {
    console.error(error);
    return throwError(() => new Error(error.message || 'Error en la solicitud'));
  }

  // Método para obtener el historial de asistencia de una clase
getHistorialAsistencia(cursoId: number, code: string): Observable<any> {
  const url = `${this.apiUrl}/cursos/${cursoId}/clase/${code}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
    'Content-Type': 'application/json'
  });

  return this.http.get<any>(url, { headers }).pipe(
    catchError(this.handleError)
  );
}

// Método para crear un nuevo anuncio en un curso
createAnuncio(id: number, titulo: string, mensaje: string): Observable<any> {
  const url = `${this.apiUrl}/cursos/${id}/anuncios`;
  const body = { titulo, mensaje };
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(url, body, { headers }).pipe(
    catchError(this.handleError)
  );
}

// Método para obtener los anuncios de un curso
getAnunciosCurso(cursoId: number): Observable<any> {
  const url = `${this.apiUrl}/cursos/${cursoId}/anuncios`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
    'Content-Type': 'application/json'
  });

  return this.http.get<any>(url, { headers }).pipe(
    catchError(this.handleError)
  );
}
}
