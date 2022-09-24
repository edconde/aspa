import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasCompeticionHoyComponent } from './pruebas-competicion-hoy.component';

describe('PruebasCompeticionHoyComponent', () => {
  let component: PruebasCompeticionHoyComponent;
  let fixture: ComponentFixture<PruebasCompeticionHoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasCompeticionHoyComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasCompeticionHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
