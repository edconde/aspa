import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlturasAddComponent } from './alturas-add.component';

describe('AlturasAddComponent', () => {
  let component: AlturasAddComponent;
  let fixture: ComponentFixture<AlturasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlturasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlturasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
