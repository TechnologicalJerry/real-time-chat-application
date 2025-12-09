import { useSocketContext } from '../context/SocketContext';

/**
 * Custom hook for socket functionality
 * Wrapper around SocketContext for easier access
 */
export const useSocket = () => {
  return useSocketContext();
};



