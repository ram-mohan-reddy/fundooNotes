import { TestBed } from '@angular/core/testing';

import { InterceptService } from './interceptor.service';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterceptService = TestBed.get(InterceptService);
    expect(service).toBeTruthy();
  });
});
