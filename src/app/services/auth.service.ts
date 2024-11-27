import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1';
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post<any>(`${this.apiUrl}/auth`, body).pipe(
      tap(response => {
        if (response.auth && response.auth.token) {
          this.setAuthToken(response.auth.token);
          this.setUserName(response.data.correo);
          this.getUserProfile(response.data.correo);
        }
      }),
      catchError(this.handleError)
    );
  }

  getUserProfile(email: string) {
    this.http.get<any>(`${this.apiUrl}/auth/me`, {
      params: { user: email },
      headers: { Authorization: `Bearer ${this.getAuthToken()}` }
    }).subscribe(profile => {
      if (profile.data.perfil === 'estudiante') {
        this.setUserRole('estudiante');
        this.redirectToPage('main-estudiante');
      } else {
        this.setUserRole('docente');
        this.redirectToPage('main-page');
      }
    });
  }

  redirectToPage(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  recoverPassword(correo: string): Observable<{ message: string }> {
    const body = { correo };
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/recuperar`, body).pipe(
      catchError(this.handleError)
    );
  }

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setUserName(name: string) {
    this.userNameSubject.next(name);
  }

  setUserRole(role: string) {
    this.userRoleSubject.next(role);
    localStorage.setItem('userRole', role);
  }

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
