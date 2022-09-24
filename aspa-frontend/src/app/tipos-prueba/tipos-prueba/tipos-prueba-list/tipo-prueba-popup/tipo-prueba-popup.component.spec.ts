import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPruebaPopupComponent } from './tipo-prueba-popup.component';

describe('TipoPruebaPopupComponent', () => {
  let component: TipoPruebaPopupComponent;
  let fixture: ComponentFixture<TipoPruebaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPruebaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPruebaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
