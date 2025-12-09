import { useChatContext } from '../context/ChatContext';

/**
 * Custom hook for chat functionality
 * Wrapper around ChatContext for easier access
 */
export const useChat = () => {
  return useChatContext();
};



