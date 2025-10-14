import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for authentication
 * Wrapper around AuthContext for easier access
 */
export const useAuth = () => {
  return useAuthContext();
};


