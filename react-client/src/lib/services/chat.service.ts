import { api } from '../utils/api-client';
import { API_ENDPOINTS } from '../utils/constants';
import { Chat, ChatRoom, CreateChatData, Message, SendMessageData, ApiResponse } from '@/types';

/**
 * Chat Service
 * Handles all chat related API calls
 */
class ChatService {
  /**
   * Get all chats for current user
   */
  async getChats(): Promise<Chat[]> {
    const response = await api.get<ApiResponse<Chat[]>>(API_ENDPOINTS.CHATS);
    return response.data.data || [];
  }

  /**
   * Get chat by ID
   */
  async getChatById(chatId: string): Promise<ChatRoom> {
    const response = await api.get<ApiResponse<ChatRoom>>(API_ENDPOINTS.CHAT_BY_ID(chatId));
    return response.data.data as ChatRoom;
  }

  /**
   * Create new chat
   */
  async createChat(data: CreateChatData): Promise<Chat> {
    const response = await api.post<ApiResponse<Chat>>(API_ENDPOINTS.CHATS, data);
    return response.data.data as Chat;
  }

  /**
   * Get messages for a chat
   */
  async getChatMessages(chatId: string, page = 1, limit = 50): Promise<Message[]> {
    const response = await api.get<ApiResponse<Message[]>>(
      `${API_ENDPOINTS.CHAT_MESSAGES(chatId)}?page=${page}&limit=${limit}`
    );
    return response.data.data || [];
  }

  /**
   * Send message
   */
  async sendMessage(data: SendMessageData): Promise<Message> {
    const response = await api.post<ApiResponse<Message>>(API_ENDPOINTS.SEND_MESSAGE, data);
    return response.data.data as Message;
  }

  /**
   * Delete chat
   */
  async deleteChat(chatId: string): Promise<void> {
    await api.delete(API_ENDPOINTS.CHAT_BY_ID(chatId));
  }

  /**
   * Mark messages as read
   */
  async markAsRead(chatId: string): Promise<void> {
    await api.patch(`${API_ENDPOINTS.CHAT_BY_ID(chatId)}/read`, {});
  }
}

export const chatService = new ChatService();



