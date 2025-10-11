import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  
  // Only access localStorage in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    
    // If token exists, clone request and add Authorization header
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonedRequest);
    }
  }
  
  // If no token or on server, proceed with original request
  return next(req);
};
