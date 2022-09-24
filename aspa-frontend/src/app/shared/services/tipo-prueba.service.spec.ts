import { TestBed } from '@angular/core/testing';

import { TipoPruebaService } from './tipo-prueba.service';

describe('TipoPruebaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoPruebaService = TestBed.get(TipoPruebaService);
    expect(service).toBeTruthy();
  });
});
