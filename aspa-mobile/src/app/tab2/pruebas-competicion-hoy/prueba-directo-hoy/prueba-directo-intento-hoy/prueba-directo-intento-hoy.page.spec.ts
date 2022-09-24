import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaDirectoIntentoHoyPage } from './prueba-directo-intento-hoy.page';

describe('PruebaDirectoIntentoHoyPage', () => {
  let component: PruebaDirectoIntentoHoyPage;
  let fixture: ComponentFixture<PruebaDirectoIntentoHoyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaDirectoIntentoHoyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaDirectoIntentoHoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
