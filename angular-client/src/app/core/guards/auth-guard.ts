import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    // User is logged in
    return true;
  }
  
  // User is not logged in, redirect to login
  console.log('Access denied. Redirecting to login...');
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
