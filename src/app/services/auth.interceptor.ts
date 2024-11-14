import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Asegúrate de que la ruta es correcta

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
