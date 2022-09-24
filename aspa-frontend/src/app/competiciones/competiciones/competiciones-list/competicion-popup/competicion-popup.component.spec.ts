import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeticionPopupComponent } from './competicion-popup.component';

describe('CompeticionPopupComponent', () => {
  let component: CompeticionPopupComponent;
  let fixture: ComponentFixture<CompeticionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompeticionPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeticionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
