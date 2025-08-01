import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should allow activation when token is present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');

    const result = authGuard.canActivate();
    expect(result).toBeTrue();
  });

  it('should redirect to login when token is not present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = authGuard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });
});
