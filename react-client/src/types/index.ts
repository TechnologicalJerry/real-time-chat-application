// Auth types
export type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  AuthState,
  DecodedToken,
} from './auth.types';

export type { User } from './user.types';

// Chat types
export type {
  Chat,
  ChatRoom,
  CreateChatData,
  TypingStatus,
} from './chat.types';

// Message types
export type {
  Message,
  SendMessageData,
  MessageResponse,
} from './message.types';

// Product types
export type {
  Product,
  CreateProductData,
  UpdateProductData,
  ProductResponse,
} from './product.types';

// User types
export type {
  UpdateUserData,
  UserResponse,
} from './user.types';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}



