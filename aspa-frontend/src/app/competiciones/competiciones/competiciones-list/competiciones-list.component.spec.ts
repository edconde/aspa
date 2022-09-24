import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeticionesListComponent } from './competiciones-list.component';

describe('CompeticionesListComponent', () => {
  let component: CompeticionesListComponent;
  let fixture: ComponentFixture<CompeticionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompeticionesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeticionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
