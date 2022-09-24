import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaAyudaComponent } from './prueba-ayuda.component';

describe('PruebaAyudaComponent', () => {
  let component: PruebaAyudaComponent;
  let fixture: ComponentFixture<PruebaAyudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaAyudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
