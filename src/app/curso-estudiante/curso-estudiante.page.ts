import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-curso-estudiante',
  templateUrl: './curso-estudiante.page.html',
  styleUrls: ['./curso-estudiante.page.scss'],
})
export class CursoEstudiantePage implements OnInit {
  asistenciaCurso: any;
  anunciosCurso: any;
  cursoId: number = 1;
  isLoading: boolean = false;

  constructor(
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cursoId = +id;
        console.log('ID del curso:', this.cursoId); // Verificar ID
        this.getAsistenciaCurso();
        this.getAnunciosCurso(); // Llamar al método para obtener los anuncios
      } else {
        console.error('ID del curso no encontrado en la URL');
      }
    });
  }

  getAsistenciaCurso() {
    this.isLoading = true;
    this.cursosService.getAsistenciaCurso(this.cursoId).subscribe(
      (response) => {
        this.isLoading = false;
        this.asistenciaCurso = response;
        console.log(this.asistenciaCurso);
      },
      (error) => {
        this.isLoading = false;
        console.error(error);
        if (error.status === 401) {
          this.showError('No autenticado');
        } else if (error.status === 403) {
          this.showError('Usuario no matriculado en el curso');
        } else if (error.status === 404) {
          this.showError('Curso no encontrado');
        }
      }
    );
  }

  getAnunciosCurso() {
    console.log('Solicitando anuncios para el curso ID:', this.cursoId); // Verificar ID en la solicitud
    this.cursosService.getAnunciosCurso(this.cursoId).subscribe(
      (response) => {
        console.log('Respuesta de anuncios:', response); // Verificar la respuesta
        if (response.anuncios && response.anuncios.length > 0) {
          this.anunciosCurso = response.anuncios;
        } else {
          this.showError('No hay anuncios disponibles para este curso');
        }
      },
      (error) => {
        console.error(error);
        if (error.status === 404) {
          this.showError('Curso no encontrado o sin anuncios');
        } else if (error.status === 401) {
          this.showError('No autenticado');
        } else {
          this.showError('Error al obtener los anuncios');
        }
      }
    );
  }
  
  async showError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}

