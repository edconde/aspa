import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasModalHoyPage } from './marcas-modal-hoy.page';

describe('MarcasModalHoyPage', () => {
  let component: MarcasModalHoyPage;
  let fixture: ComponentFixture<MarcasModalHoyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasModalHoyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasModalHoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
