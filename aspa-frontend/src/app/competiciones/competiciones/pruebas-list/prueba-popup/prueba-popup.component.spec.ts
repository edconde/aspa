import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaPopupComponent } from './prueba-popup.component';

describe('PruebaPopupComponent', () => {
  let component: PruebaPopupComponent;
  let fixture: ComponentFixture<PruebaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
