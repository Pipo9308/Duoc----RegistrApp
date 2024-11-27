
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-page-estudiante',
  templateUrl: './main-estudiante.page.html',
  styleUrls: ['./main-estudiante.page.scss'],
})
export class MainEstudiantePage  implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Suscribirse a userName$ para obtener el nombre del usuario de forma reactiva
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });
  }
}
