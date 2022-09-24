import { TestBed } from '@angular/core/testing';

import { MarcaNsService } from './marca-ns.service';

describe('MarcaNsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcaNsService = TestBed.get(MarcaNsService);
    expect(service).toBeTruthy();
  });
});
