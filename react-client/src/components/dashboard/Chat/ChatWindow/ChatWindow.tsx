'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '@/types';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  chatId: string | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onTyping?: (isTyping: boolean) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  messages,
  currentUserId,
  onSendMessage,
  onTyping,
}) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);

    // Emit typing status
    if (onTyping) {
      onTyping(true);

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing after 2 seconds
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (messageText.trim() === '') {
      return;
    }

    onSendMessage(messageText);
    setMessageText('');

    if (onTyping) {
      onTyping(false);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!chatId) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>💬</div>
        <h3>Select a conversation</h3>
        <p>Choose a chat from the list to start messaging</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.noMessages}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId;

            return (
              <div
                key={message._id}
                className={`${styles.message} ${isOwn ? styles.own : styles.other}`}
              >
                {!isOwn && message.senderName && (
                  <div className={styles.senderName}>{message.senderName}</div>
                )}
                <div className={styles.messageContent}>
                  <div className={styles.messageBubble}>
                    {message.content}
                  </div>
                  <div className={styles.messageTime}>
                    {formatTime(message.createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={messageText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={messageText.trim() === ''}
        >
          Send
        </button>
      </form>
    </div>
  );
};



