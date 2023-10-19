import { TestBed } from '@angular/core/testing';

import { UserlogsService } from './userlogs.service';

describe('UserlogsService', () => {
  let service: UserlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
