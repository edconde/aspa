import { TestBed } from '@angular/core/testing';

import { MarcaSVService } from './marca-sv.service';

describe('MarcaSVService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcaSVService = TestBed.get(MarcaSVService);
    expect(service).toBeTruthy();
  });
});
