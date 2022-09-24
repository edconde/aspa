import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubPopupComponent } from './club-popup.component';

describe('Clubomponent', () => {
  let component: ClubPopupComponent;
  let fixture: ComponentFixture<ClubPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
