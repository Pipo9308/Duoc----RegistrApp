import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaCursoPage } from './pagina-curso.page';

describe('PaginaCursoPage', () => {
  let component: PaginaCursoPage;
  let fixture: ComponentFixture<PaginaCursoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
