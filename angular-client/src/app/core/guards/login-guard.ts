import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

// Prevents logged-in users from accessing login/signup pages
export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  // Check if we're running in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    
    if (token) {
      // User is already logged in, redirect to dashboard
      console.log('Already logged in. Redirecting to dashboard...');
      router.navigate(['/dashboard']);
      return false;
    }
  }
  
  // User is not logged in, allow access to login/signup
  return true;
};
