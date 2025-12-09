'use client';

import React, { useState, useEffect } from 'react';
import { ChatList } from './ChatList/ChatList';
import { ChatWindow } from './ChatWindow/ChatWindow';
import { useChat } from '@/lib/hooks/useChat';
import { useSocket } from '@/lib/hooks/useSocket';
import { useAuth } from '@/lib/hooks/useAuth';
import styles from './Chat.module.css';

export const Chat: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { chats, activeChat, messages, loadChatById, sendMessage, addMessage } = useChat();
  const { joinChat, leaveChat, onNewMessage, offNewMessage, emitTyping } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    // Listen for new messages via socket
    onNewMessage((message) => {
      addMessage(message);
    });

    return () => {
      offNewMessage();
    };
  }, [onNewMessage, offNewMessage, addMessage]);

  const handleChatSelect = async (chatId: string) => {
    // Leave previous chat
    if (selectedChatId) {
      leaveChat(selectedChatId);
    }

    // Join new chat
    setSelectedChatId(chatId);
    joinChat(chatId);
    await loadChatById(chatId);
  };

  const handleSendMessage = async (content: string) => {
    if (selectedChatId) {
      try {
        await sendMessage(selectedChatId, content);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleTyping = (isTyping: boolean) => {
    if (selectedChatId) {
      emitTyping(selectedChatId, isTyping);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        <ChatList
          chats={chats}
          activeChat={selectedChatId}
          onChatSelect={handleChatSelect}
        />
      </div>
      <div className={styles.chatWindow}>
        <ChatWindow
          chatId={selectedChatId}
          messages={messages}
          currentUserId={user?._id || ''}
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
        />
      </div>
    </div>
  );
};



