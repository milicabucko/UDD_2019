import { TestBed, inject } from '@angular/core/testing';

import { NaucnaCentralaService } from './naucna-centrala.service';

describe('NaucnaCentralaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NaucnaCentralaService]
    });
  });

  it('should be created', inject([NaucnaCentralaService], (service: NaucnaCentralaService) => {
    expect(service).toBeTruthy();
  }));
});
