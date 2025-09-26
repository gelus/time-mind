import { TestBed } from '@angular/core/testing';

import { GAuthService } from './g-auth.service';

describe('GAuthService', () => {
  let service: GAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
