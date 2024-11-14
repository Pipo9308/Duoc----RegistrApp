import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userName = this.authService.getUserName(); // Obtener el nombre del usuario
  }
}
