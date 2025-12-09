import { useToastContext } from '../context/ToastContext';

/**
 * Custom hook for toast notifications
 * Wrapper around ToastContext for easier access
 */
export const useToast = () => {
  return useToastContext();
};



