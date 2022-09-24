import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlturaEditComponent } from './altura-edit.component';

describe('AlturaEditComponent', () => {
  let component: AlturaEditComponent;
  let fixture: ComponentFixture<AlturaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlturaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlturaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
