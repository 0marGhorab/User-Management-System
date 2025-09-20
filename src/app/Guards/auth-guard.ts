import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // injections
  const router = inject(Router);
  // constants
  const isAuth = localStorage.getItem('Token');
  if (isAuth != null) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
