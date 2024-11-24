import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-class-modal',
  templateUrl: './create-class-modal.component.html',
  styleUrls: ['./create-class-modal.component.scss'],
})
export class CreateClassModalComponent {

  @Input() cursoId: number; // Recibimos el ID del curso desde el componente padre

  fechaClase: string = '';
  horaInicioClase: string = '';
  horaTerminoClase: string = '';

  constructor(private modalCtrl: ModalController) {}

  // Método para cerrar el modal
  close() {
    this.modalCtrl.dismiss();
  }

  // Método para guardar la clase
  onSaveClase() {
    // Aquí puedes manejar la lógica para crear la clase (como llamar a un servicio API)
    console.log('Clase creada:', {
      cursoId: this.cursoId,
      fechaClase: this.fechaClase,
      horaInicioClase: this.horaInicioClase,
      horaTerminoClase: this.horaTerminoClase,
    });
    this.close(); // Cierra el modal después de guardar
  }
}
