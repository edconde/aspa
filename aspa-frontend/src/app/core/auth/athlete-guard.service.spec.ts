import { TestBed } from '@angular/core/testing';

import { AthleteGuardService } from './athlete-guard.service';

describe('AthleteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AthleteGuardService = TestBed.get(AthleteGuardService);
    expect(service).toBeTruthy();
  });
});
