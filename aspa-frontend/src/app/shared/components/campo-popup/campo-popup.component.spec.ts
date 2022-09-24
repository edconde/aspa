import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoPopupComponent } from './campo-popup.component';

describe('CampoPopupComponent', () => {
  let component: CampoPopupComponent;
  let fixture: ComponentFixture<CampoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
