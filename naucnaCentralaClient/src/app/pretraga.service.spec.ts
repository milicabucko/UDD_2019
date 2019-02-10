import { TestBed } from '@angular/core/testing';

import { PretragaService } from './pretraga.service';

describe('PretragaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PretragaService = TestBed.get(PretragaService);
    expect(service).toBeTruthy();
  });
});
