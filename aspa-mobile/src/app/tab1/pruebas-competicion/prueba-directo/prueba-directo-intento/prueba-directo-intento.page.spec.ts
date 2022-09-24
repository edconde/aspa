import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaDirectoIntentoPage } from './prueba-directo-intento.page';

describe('PruebaDirectoIntentoPage', () => {
  let component: PruebaDirectoIntentoPage;
  let fixture: ComponentFixture<PruebaDirectoIntentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaDirectoIntentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaDirectoIntentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
