import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoIntentoNoSvComponent } from './resultado-intento-no-sv.component';

describe('ResultadoIntentoNoSvComponent', () => {
  let component: ResultadoIntentoNoSvComponent;
  let fixture: ComponentFixture<ResultadoIntentoNoSvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoIntentoNoSvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoIntentoNoSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
