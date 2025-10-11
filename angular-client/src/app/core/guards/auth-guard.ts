import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  // Check if we're running in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    
    if (token) {
      // User is logged in
      return true;
    }
    
    // User is not logged in, redirect to login
    console.log('Access denied. Redirecting to login...');
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
  // On server, redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
