import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordrecoveryPage } from './passwordrecovery.page';

describe('PasswordrecoveryPage', () => {
  let component: PasswordrecoveryPage;
  let fixture: ComponentFixture<PasswordrecoveryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordrecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
