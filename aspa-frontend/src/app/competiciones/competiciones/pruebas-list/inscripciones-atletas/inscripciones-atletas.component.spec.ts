import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesAtletasComponent } from './inscripciones-atletas.component';

describe('InscripcionesAtletasComponent', () => {
  let component: InscripcionesAtletasComponent;
  let fixture: ComponentFixture<InscripcionesAtletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionesAtletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesAtletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
