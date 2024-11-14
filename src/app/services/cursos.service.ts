// cursos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  createCurso(nombre: string, sigla: string, institucion: string, descripcion: string): Observable<any> {
    const body = { nombre, sigla, institucion, descripcion };
    return this.http.post<any>(`${this.apiUrl}/cursos`, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en el servicio', error);
    return throwError(error);
  }
}
