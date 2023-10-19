import { TestBed } from '@angular/core/testing';

import { CompservicesService } from './compservices.service';

describe('CompservicesService', () => {
  let service: CompservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
