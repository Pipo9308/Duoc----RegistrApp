import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1'; // Cambia esto por tu URL real
  private userName: string | null = null;

  constructor(private http: HttpClient) { }

  // Método de login
  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}/auth`, body).pipe(
      tap(response => {
        if (response.token) {
          this.setAuthToken(response.token);  // Guarda el token en el localStorage
          this.setUserName(response.userName);  // Guarda el nombre de usuario si es necesario
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método para registrar un nuevo usuario
  registerUser(codigo: string, run: string, nombre: string, apellido: string, correo: string, perfil: string): Observable<any> {
    const body = { codigo, run, nombre, apellido, correo, perfil };
    return this.http.post<any>(`${this.apiUrl}/usuarios`, body);
  }

  // Método para actualizar la contraseña
  updatePassword(password: string, token: string): Observable<any> {
    const body = { password };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/usuarios/password`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar el token de autenticación en localStorage
  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);  // Guardar el token en localStorage
  }

  // Obtener el token de autenticación desde localStorage
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');  // Obtener el token de localStorage
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
    throw error;
  }

  // Método para recuperar la contraseña
  recoverPassword(correo: string): Observable<any> {
    const body = { correo };
    return this.http.post<any>(`${this.apiUrl}/recuperar`, body);
  }
}
