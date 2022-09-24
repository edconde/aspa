import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasModalPage } from './marcas-modal.page';

describe('MarcasModalPage', () => {
  let component: MarcasModalPage;
  let fixture: ComponentFixture<MarcasModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
