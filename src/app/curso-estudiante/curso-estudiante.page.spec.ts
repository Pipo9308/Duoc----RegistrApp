import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoEstudiantePage } from './curso-estudiante.page';

describe('CursoEstudiantePage', () => {
  let component: CursoEstudiantePage;
  let fixture: ComponentFixture<CursoEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
