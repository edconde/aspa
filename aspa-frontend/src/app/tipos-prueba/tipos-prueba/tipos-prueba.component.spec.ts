import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPruebaComponent } from './tipos-prueba.component';

describe('TiposPruebaComponent', () => {
  let component: TiposPruebaComponent;
  let fixture: ComponentFixture<TiposPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TiposPruebaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
