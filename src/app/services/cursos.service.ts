// cursos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1';

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

// Manejo de errores
private handleError(error: any): Observable<any> {
  console.error(error);
  throw error; // Maneja el error de acuerdo a tus necesidades
}

getAsistenciaClase(cursoId: number, claseCode: string) {
  return this.http.get<any>(`/api/v1/cursos/${cursoId}/clase/${claseCode}`);
}
}