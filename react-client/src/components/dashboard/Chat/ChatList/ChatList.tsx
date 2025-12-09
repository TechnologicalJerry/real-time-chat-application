'use client';

import React from 'react';
import { Chat } from '@/types';
import styles from './ChatList.module.css';

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, activeChat, onChatSelect }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Messages</h2>
      </div>

      <div className={styles.chatList}>
        {chats.length === 0 ? (
          <div className={styles.empty}>
            <p>No conversations yet</p>
            <span>Start a new chat to begin messaging</span>
          </div>
        ) : (
          chats.map((chat) => {
            const otherUser = chat.participants[0]; // Simplified - normally you'd filter out current user
            const isActive = activeChat === chat._id;

            return (
              <div
                key={chat._id}
                className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
                onClick={() => onChatSelect(chat._id)}
              >
                <div className={styles.avatar}>
                  {otherUser?.username?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatHeader}>
                    <span className={styles.username}>
                      {otherUser?.username || 'Unknown'}
                    </span>
                    {chat.lastMessage && (
                      <span className={styles.time}>
                        {formatTime(chat.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className={styles.lastMessage}>
                    {chat.lastMessage?.content || 'No messages yet'}
                  </div>
                </div>
                {chat.unreadCount && chat.unreadCount > 0 && (
                  <div className={styles.unreadBadge}>{chat.unreadCount}</div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};



