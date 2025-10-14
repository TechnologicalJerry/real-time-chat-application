import { isAuthenticated, isAdmin, getUserRole } from '../utils/token';

/**
 * Check if user is authenticated
 */
export const checkAuth = (): boolean => {
  return isAuthenticated();
};

/**
 * Check if user has admin role
 */
export const checkAdmin = (): boolean => {
  return isAdmin();
};

/**
 * Check if user has specific role
 */
export const checkRole = (role: string): boolean => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Get redirect URL based on authentication status
 */
export const getRedirectUrl = (isAuth: boolean, intendedPath?: string): string => {
  if (isAuth) {
    return intendedPath || '/dashboard';
  }
  return '/auth/login';
};


