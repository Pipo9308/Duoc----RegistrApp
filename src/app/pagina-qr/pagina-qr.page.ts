import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-pagina-qr',
  templateUrl: './pagina-qr.page.html',
  styleUrls: ['./pagina-qr.page.scss'],
})
export class PaginaQrPage implements OnInit {
  scanResult: string = ''; 
  isScanning: boolean = false; 
  cursoId: string | null = null; 

  @ViewChild('camera', { static: false }) cameraElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService  // Inyectar el servicio
  ) {}

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    console.log('ID del curso:', this.cursoId);
  }

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

  async startScanner() {
    try {
      this.isScanning = true;
      document.querySelector('body')?.classList.add('scanner-active');
      await BarcodeScanner.hideBackground();

      // Acceder a la cámara y mostrarla en el video
      this.startCamera();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanResult = result.content;
        console.log('Código QR escaneado:', this.scanResult);
        // Llamar al servicio para registrar la asistencia
        this.registerAsistencia();
        this.stopScanner();
      } else {
        console.log('No se detectó contenido en el código QR.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.stopScanner();
    }
  }

  async stopScanner() {
    this.isScanning = false;
    await BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
    await BarcodeScanner.stopScan();
    this.stopCamera();
  }

  // Inicializar la cámara
  startCamera() {
    const videoElement = this.cameraElement.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
          videoElement.play();
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara:', error);
          alert('No se pudo acceder a la cámara.');
        });
    }
  }

  // Detener la cámara
  stopCamera() {
    const videoElement = this.cameraElement.nativeElement;
    const stream = videoElement.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track: MediaStreamTrack) => track.stop());
  }

  async registerAsistencia() {
    if (this.scanResult && this.cursoId) {
      this.cursosService.registerAsistenciaClase(this.scanResult).subscribe({
        next: async (response) => {
          alert(response.message); // Muestra el mensaje de la respuesta
        },
        error: (error) => {
          alert('Error al registrar asistencia: ' + error.message);
        }
      });
    }
  }

  async handleBackAction() {
    if (this.isScanning) {
      await this.stopScanner();
    }
  }
}
