import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeCampoNoSvComponent } from './hoja-de-campo-no-sv.component';

describe('HojaDeCampoNoSvComponent', () => {
  let component: HojaDeCampoNoSvComponent;
  let fixture: ComponentFixture<HojaDeCampoNoSvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDeCampoNoSvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDeCampoNoSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
