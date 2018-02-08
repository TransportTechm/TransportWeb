import { TestBed, inject } from '@angular/core/testing';

import { RequestBusService } from './request-bus.service';

describe('RequestBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestBusService]
    });
  });

  it('should be created', inject([RequestBusService], (service: RequestBusService) => {
    expect(service).toBeTruthy();
  }));
});
