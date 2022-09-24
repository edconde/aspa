import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPruebaListComponent } from './tipos-prueba-list.component';

describe('TiposPruebaListComponent', () => {
  let component: TiposPruebaListComponent;
  let fixture: ComponentFixture<TiposPruebaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TiposPruebaListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposPruebaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
