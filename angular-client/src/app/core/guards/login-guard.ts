import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Prevents logged-in users from accessing login/signup pages
export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    // User is already logged in, redirect to dashboard
    console.log('Already logged in. Redirecting to dashboard...');
    router.navigate(['/dashboard']);
    return false;
  }
  
  // User is not logged in, allow access to login/signup
  return true;
};
