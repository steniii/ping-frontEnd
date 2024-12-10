import { TestBed } from '@angular/core/testing';

import { MapServicesService } from './pings.service';

describe('PingsService', () => {
  let service: MapServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
