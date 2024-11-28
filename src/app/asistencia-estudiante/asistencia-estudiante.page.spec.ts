import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaEstudiantePage } from './asistencia-estudiante.page';

describe('AsistenciaEstudiantePage', () => {
  let component: AsistenciaEstudiantePage;
  let fixture: ComponentFixture<AsistenciaEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
