import { isAuthenticated, isAdmin } from '../utils/token';

/**
 * Check if user has admin access
 */
export const checkAdminAccess = (): { hasAccess: boolean; reason?: string } => {
  // First check if authenticated
  if (!isAuthenticated()) {
    return {
      hasAccess: false,
      reason: 'Not authenticated',
    };
  }

  // Check if user is admin
  if (!isAdmin()) {
    return {
      hasAccess: false,
      reason: 'Insufficient permissions',
    };
  }

  return { hasAccess: true };
};

/**
 * Guard function for admin-only operations
 */
export const requireAdmin = (callback: () => void): void => {
  const { hasAccess, reason } = checkAdminAccess();

  if (!hasAccess) {
    throw new Error(reason || 'Access denied');
  }

  callback();
};


