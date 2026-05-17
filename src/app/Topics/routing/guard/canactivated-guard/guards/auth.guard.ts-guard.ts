import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuardTsGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const router = inject(Router);

  if(auth.isLoggedIn()){
    return true;
  }


  return router.createUrlTree(['./']);
};
