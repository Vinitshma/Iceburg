import { TestBed } from '@angular/core/testing';

import { NotifyhubService } from './notifyhub.service';

describe('NotifyhubService', () => {
  let service: NotifyhubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyhubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
