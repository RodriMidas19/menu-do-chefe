import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { permsGuard } from './perms.guard';

describe('permsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => permsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
