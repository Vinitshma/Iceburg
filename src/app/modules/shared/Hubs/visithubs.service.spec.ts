import { TestBed } from '@angular/core/testing';

import { VisithubsService } from './visithubs.service';

describe('VisithubsService', () => {
  let service: VisithubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisithubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
