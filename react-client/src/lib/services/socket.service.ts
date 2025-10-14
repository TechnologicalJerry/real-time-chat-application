import { io, Socket } from 'socket.io-client';
import { SOCKET_URL, SOCKET_EVENTS } from '../utils/constants';
import { getToken } from '../utils/token';
import { Message, TypingStatus } from '@/types';

/**
 * Socket Service
 * Handles WebSocket connections using Socket.io
 */
class SocketService {
  private socket: Socket | null = null;
  private connected: boolean = false;

  /**
   * Initialize socket connection
   */
  connect(): void {
    if (this.connected) {
      console.log('Socket already connected');
      return;
    }

    const token = getToken();
    if (!token) {
      console.error('No auth token found');
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  /**
   * Setup socket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Socket connected:', this.socket?.id);
      this.connected = true;
    });

    this.socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log('Socket disconnected');
      this.connected = false;
    });

    this.socket.on(SOCKET_EVENTS.ERROR, (error: any) => {
      console.error('Socket error:', error);
    });

    this.socket.on(SOCKET_EVENTS.AUTHENTICATED, (data: any) => {
      console.log('Socket authenticated:', data);
    });
  }

  /**
   * Disconnect socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.connected && this.socket?.connected === true;
  }

  /**
   * Join a chat room
   */
  joinChat(chatId: string): void {
    if (this.socket) {
      this.socket.emit(SOCKET_EVENTS.JOIN_CHAT, { chatId });
    }
  }

  /**
   * Leave a chat room
   */
  leaveChat(chatId: string): void {
    if (this.socket) {
      this.socket.emit(SOCKET_EVENTS.LEAVE_CHAT, { chatId });
    }
  }

  /**
   * Send message through socket
   */
  sendMessage(message: any): void {
    if (this.socket) {
      this.socket.emit(SOCKET_EVENTS.NEW_MESSAGE, message);
    }
  }

  /**
   * Listen for new messages
   */
  onNewMessage(callback: (message: Message) => void): void {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, callback);
    }
  }

  /**
   * Remove new message listener
   */
  offNewMessage(): void {
    if (this.socket) {
      this.socket.off(SOCKET_EVENTS.MESSAGE_RECEIVED);
    }
  }

  /**
   * Emit typing status
   */
  emitTyping(chatId: string, isTyping: boolean): void {
    if (this.socket) {
      const event = isTyping ? SOCKET_EVENTS.TYPING_START : SOCKET_EVENTS.TYPING_STOP;
      this.socket.emit(event, { chatId });
    }
  }

  /**
   * Listen for typing status
   */
  onUserTyping(callback: (data: TypingStatus) => void): void {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.USER_TYPING, callback);
    }
  }

  /**
   * Remove typing listener
   */
  offUserTyping(): void {
    if (this.socket) {
      this.socket.off(SOCKET_EVENTS.USER_TYPING);
    }
  }

  /**
   * Listen for user status changes
   */
  onUserStatusChange(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.USER_STATUS_CHANGE, callback);
    }
  }

  /**
   * Remove user status listener
   */
  offUserStatusChange(): void {
    if (this.socket) {
      this.socket.off(SOCKET_EVENTS.USER_STATUS_CHANGE);
    }
  }

  /**
   * Get socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();


