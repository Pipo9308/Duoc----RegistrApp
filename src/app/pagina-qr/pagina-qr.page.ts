import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-pagina-qr',
  templateUrl: './pagina-qr.page.html',
  styleUrls: ['./pagina-qr.page.scss'],
})
export class PaginaQrPage {
  scanResult: string = '';  // Variable para almacenar el resultado del escaneo

  constructor() {}

  // Método para verificar permisos y iniciar el escáner
  async checkPermissionAndScan() {
    try {
      // Verificar permisos
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        this.startScanner(); // Si los permisos están otorgados, iniciar el escáner
      } else if (status.denied) {
        alert('Permiso denegado. Necesitas habilitar los permisos de cámara para escanear códigos QR.');
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      alert('Hubo un error al verificar los permisos.');
    }
  }

  // Método para iniciar el escáner
  async startScanner() {
    try {
      // Mostrar la cámara para previsualización
      console.log('Iniciando el escáner y mostrando la cámara...');
      document.querySelector('body')?.classList.add('scanner-active');
      await BarcodeScanner.hideBackground(); // Mostrar la cámara y ocultar el fondo

      const result = await BarcodeScanner.startScan(); // Iniciar escáner

      // Verificar si se ha escaneado un código QR
      if (result.hasContent) {
        this.scanResult = result.content; // Guardar el resultado del escaneo
        console.log('Código QR escaneado: ', this.scanResult);
      } else {
        console.log('No se detectó contenido en el código QR.');
      }

      // Después de terminar el escáner, quitar la clase y mostrar el fondo
      document.querySelector('body')?.classList.remove('scanner-active');
      BarcodeScanner.showBackground(); // Volver a mostrar el fondo

    } catch (error) {
      console.error('Error al escanear:', error);
    }
  }
}
