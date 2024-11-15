// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1';
  private userName: string | null = null;

  constructor(private http: HttpClient) { }

  // Método de login
  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}/auth`, body).pipe(
      tap(response => {
        if (response.auth && response.auth.token) {
          this.setAuthToken(response.auth.token);  // Guarda el token
          this.setUserName(response.data.correo);  // Guarda el correo del usuario
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método para recuperar la contraseña
  recoverPassword(correo: string): Observable<any> {
    const body = { correo };
    return this.http.post<any>(`${this.apiUrl}/auth/recuperar`, body).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar el token de autenticación en localStorage
  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Obtener el token de autenticación desde localStorage
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Guardar el nombre de usuario
  setUserName(name: string) {
    this.userName = name;
  }

  // Obtener el nombre de usuario
  getUserName(): string | null {
    return this.userName;
  }

  // Manejo de errores
  private handleError(error: any): Observable<any> {
    let errorMessage = 'Ocurrió un error. Intenta nuevamente.';
    if (error.status === 500 && error.error) {
      errorMessage = error.error.message || 'Error en el servidor. Contacta al soporte.';
    } else if (error.status === 404) {
      errorMessage = 'Usuario no encontrado';
    }
    return throwError({ error: { message: errorMessage } });
  }
}
