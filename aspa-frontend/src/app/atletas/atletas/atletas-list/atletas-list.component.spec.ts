import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtletasListComponent } from './atletas-list.component';

describe('AtletasListComponent', () => {
  let component: AtletasListComponent;
  let fixture: ComponentFixture<AtletasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtletasListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtletasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
