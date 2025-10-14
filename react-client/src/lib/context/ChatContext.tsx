'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { chatService } from '../services/chat.service';
import { Chat, Message, ChatRoom } from '@/types';
import { useAuthContext } from './AuthContext';

interface ChatContextType {
  chats: Chat[];
  activeChat: ChatRoom | null;
  messages: Message[];
  isLoading: boolean;
  setActiveChat: (chat: ChatRoom | null) => void;
  loadChats: () => Promise<void>;
  loadChatById: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, content: string) => Promise<void>;
  addMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuthContext();

  // Load chats when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadChats();
    }
  }, [isAuthenticated]);

  const loadChats = async () => {
    setIsLoading(true);
    try {
      const fetchedChats = await chatService.getChats();
      setChats(fetchedChats);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatById = async (chatId: string) => {
    setIsLoading(true);
    try {
      const chat = await chatService.getChatById(chatId);
      setActiveChat(chat);
      setMessages(chat.messages || []);
    } catch (error) {
      console.error('Error loading chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (chatId: string, content: string) => {
    try {
      const message = await chatService.sendMessage({ chatId, content, type: 'text' });
      addMessage(message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    
    // Update last message in chats list
    setChats((prev) =>
      prev.map((chat) =>
        chat._id === message.chatId ? { ...chat, lastMessage: message } : chat
      )
    );
  };

  const updateMessage = (updatedMessage: Message) => {
    setMessages((prev) =>
      prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        messages,
        isLoading,
        setActiveChat,
        loadChats,
        loadChatById,
        sendMessage,
        addMessage,
        updateMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};


