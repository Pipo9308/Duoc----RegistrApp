import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaQrPage } from './pagina-qr.page';

describe('PaginaQrPage', () => {
  let component: PaginaQrPage;
  let fixture: ComponentFixture<PaginaQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
