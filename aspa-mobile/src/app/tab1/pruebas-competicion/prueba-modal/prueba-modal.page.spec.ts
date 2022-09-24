import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaModalPage } from './prueba-modal.page';

describe('PruebaModalPage', () => {
  let component: PruebaModalPage;
  let fixture: ComponentFixture<PruebaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
