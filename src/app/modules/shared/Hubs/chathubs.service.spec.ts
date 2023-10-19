import { TestBed } from '@angular/core/testing';

import { ChathubsService } from './chathubs.service';

describe('ChathubsService', () => {
  let service: ChathubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChathubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
