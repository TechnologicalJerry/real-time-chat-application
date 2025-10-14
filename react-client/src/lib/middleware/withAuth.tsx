'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

/**
 * Higher-Order Component for route protection
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireAdmin?: boolean;
  }
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
          router.push(ROUTES.LOGIN);
          return;
        }

        // Redirect to dashboard if admin access required but user is not admin
        if (options?.requireAdmin && user?.role !== 'admin') {
          router.push(ROUTES.DASHBOARD);
        }
      }
    }, [isAuthenticated, isLoading, user, router]);

    // Show loading state
    if (isLoading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <p>Loading...</p>
        </div>
      );
    }

    // Don't render component if not authenticated or not admin (when required)
    if (!isAuthenticated || (options?.requireAdmin && user?.role !== 'admin')) {
      return null;
    }

    return <Component {...props} />;
  };
}


