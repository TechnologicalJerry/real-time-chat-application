'use client';

import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { socketService } from '../services/socket.service';
import { useAuthContext } from './AuthContext';
import { Message, TypingStatus } from '@/types';

interface SocketContextType {
  isConnected: boolean;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  sendMessage: (message: any) => void;
  onNewMessage: (callback: (message: Message) => void) => void;
  offNewMessage: () => void;
  emitTyping: (chatId: string, isTyping: boolean) => void;
  onUserTyping: (callback: (data: TypingStatus) => void) => void;
  offUserTyping: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      // Connect socket when authenticated
      socketService.connect();
      
      // Check connection status
      const checkConnection = setInterval(() => {
        setIsConnected(socketService.isConnected());
      }, 1000);

      return () => {
        clearInterval(checkConnection);
        socketService.disconnect();
      };
    } else {
      // Disconnect socket when not authenticated
      socketService.disconnect();
      setIsConnected(false);
    }
  }, [isAuthenticated]);

  const joinChat = (chatId: string) => {
    socketService.joinChat(chatId);
  };

  const leaveChat = (chatId: string) => {
    socketService.leaveChat(chatId);
  };

  const sendMessage = (message: any) => {
    socketService.sendMessage(message);
  };

  const onNewMessage = (callback: (message: Message) => void) => {
    socketService.onNewMessage(callback);
  };

  const offNewMessage = () => {
    socketService.offNewMessage();
  };

  const emitTyping = (chatId: string, isTyping: boolean) => {
    socketService.emitTyping(chatId, isTyping);
  };

  const onUserTyping = (callback: (data: TypingStatus) => void) => {
    socketService.onUserTyping(callback);
  };

  const offUserTyping = () => {
    socketService.offUserTyping();
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        joinChat,
        leaveChat,
        sendMessage,
        onNewMessage,
        offNewMessage,
        emitTyping,
        onUserTyping,
        offUserTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};


