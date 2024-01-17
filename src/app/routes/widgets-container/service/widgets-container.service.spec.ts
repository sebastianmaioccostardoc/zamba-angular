import { TestBed } from '@angular/core/testing';
import { WidgetsContainerService } from './widgets-container.service';

describe('WidgetsContainerService', () => {
  let service: WidgetsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
