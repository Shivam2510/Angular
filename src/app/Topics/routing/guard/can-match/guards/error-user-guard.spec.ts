import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { errorUserGuard } from './error-user-guard';

describe('errorUserGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => errorUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
