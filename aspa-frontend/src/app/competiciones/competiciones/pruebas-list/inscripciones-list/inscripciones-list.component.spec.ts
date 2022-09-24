import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesListComponent } from './inscripciones-list.component';

describe('InscripcionesListComponent', () => {
  let component: InscripcionesListComponent;
  let fixture: ComponentFixture<InscripcionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
