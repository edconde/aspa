import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionPruebaHoyComponent } from './clasificacion-prueba-hoy.component';

describe('ClasificacionPruebaHoyComponent', () => {
  let component: ClasificacionPruebaHoyComponent;
  let fixture: ComponentFixture<ClasificacionPruebaHoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasificacionPruebaHoyComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificacionPruebaHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
