import { TestBed } from '@angular/core/testing';

import { JudgeGuardService } from './judge-guard.service';

describe('JudgeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JudgeGuardService = TestBed.get(JudgeGuardService);
    expect(service).toBeTruthy();
  });
});
