import { User } from './auth.types';
import { Message } from './message.types';

export interface Chat {
  _id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoom {
  _id: string;
  name?: string;
  participants: User[];
  messages: Message[];
  isTyping?: string[]; // Array of user IDs currently typing
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatData {
  participantIds: string[];
  message?: string;
}

export interface TypingStatus {
  chatId: string;
  userId: string;
  username: string;
  isTyping: boolean;
}


