import { TestBed } from '@angular/core/testing';

import { PendingVacationsService } from './pending-vacations.service';

describe('PendingVacationsService', () => {
  let service: PendingVacationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingVacationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
