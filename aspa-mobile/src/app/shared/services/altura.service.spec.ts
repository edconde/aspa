import { TestBed } from '@angular/core/testing';

import { AlturaService } from './altura.service';

describe('AlturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlturaService = TestBed.get(AlturaService);
    expect(service).toBeTruthy();
  });
});
