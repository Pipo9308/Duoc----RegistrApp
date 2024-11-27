import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-pagina-qr',
  templateUrl: './pagina-qr.page.html',
  styleUrls: ['./pagina-qr.page.scss'],
})
export class PaginaQrPage {
  scanResult: string = ''; // Almacena el resultado del escaneo
  isScanning: boolean = false; // Indica si el escáner está activo

  constructor() {}

  // Verificar permisos y comenzar escaneo
  async checkPermissionAndScan() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        this.startScanner();
      } else if (status.denied) {
        alert('Permiso de cámara denegado. Habilítalos manualmente en la configuración.');
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      alert('Ocurrió un error al verificar permisos.');
    }
  }

  // Iniciar el escáner
  async startScanner() {
    try {
      this.isScanning = true;
      document.querySelector('body')?.classList.add('scanner-active');
      await BarcodeScanner.hideBackground(); // Ocultar el fondo y mostrar la cámara

      const result = await BarcodeScanner.startScan(); // Iniciar el escaneo

      if (result.hasContent) {
        this.scanResult = result.content; // Guardar el resultado del escaneo
        console.log('Código QR escaneado:', this.scanResult);
        this.stopScanner();
      } else {
        console.log('No se detectó contenido en el código QR.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.stopScanner();
    }
  }

  // Detener el escáner
  async stopScanner() {
    this.isScanning = false;
    await BarcodeScanner.showBackground(); // Mostrar el fondo nuevamente
    document.querySelector('body')?.classList.remove('scanner-active');
    await BarcodeScanner.stopScan(); // Detener el escáner
  }

  // Volver atrás mientras se escanea
  async handleBackAction() {
    if (this.isScanning) {
      await this.stopScanner(); // Detener el escaneo si está activo
    }
  }
}
