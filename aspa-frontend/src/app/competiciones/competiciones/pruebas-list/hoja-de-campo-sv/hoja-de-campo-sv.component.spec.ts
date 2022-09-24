import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaDeCampoSvComponent } from './hoja-de-campo-sv.component';

describe('HojaDeCampoSvComponent', () => {
  let component: HojaDeCampoSvComponent;
  let fixture: ComponentFixture<HojaDeCampoSvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaDeCampoSvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaDeCampoSvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
