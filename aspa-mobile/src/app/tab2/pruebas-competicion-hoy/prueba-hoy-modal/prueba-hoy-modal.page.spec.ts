import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaHoyModalPage } from './prueba-hoy-modal.page';

describe('PruebaHoyModalPage', () => {
  let component: PruebaHoyModalPage;
  let fixture: ComponentFixture<PruebaHoyModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaHoyModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaHoyModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
