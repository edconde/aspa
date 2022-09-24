import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoIntentoSvComponent } from './resultado-intento-sv.component';

describe('ResultadoIntentoSvComponent', () => {
  let component: ResultadoIntentoSvComponent;
  let fixture: ComponentFixture<ResultadoIntentoSvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoIntentoSvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoIntentoSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
