import { TestBed } from '@angular/core/testing';

import { ApplogsService } from './applogs.service';

describe('ApplogsService', () => {
  let service: ApplogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
