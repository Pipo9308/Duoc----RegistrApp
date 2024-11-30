import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialAsistenciaPage } from './historial-asistencia.page';

describe('HistorialAsistenciaPage', () => {
  let component: HistorialAsistenciaPage;
  let fixture: ComponentFixture<HistorialAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
