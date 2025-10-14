// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_TOKEN: '/auth/verify',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,
  UPDATE_PROFILE: '/users/profile',
  
  // Chat
  CHATS: '/chats',
  CHAT_BY_ID: (id: string) => `/chats/${id}`,
  CHAT_MESSAGES: (chatId: string) => `/chats/${chatId}/messages`,
  SEND_MESSAGE: '/chats/messages',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  
  // Sessions
  SESSIONS: '/sessions',
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  
  // Authentication
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  
  // Chat
  JOIN_CHAT: 'join_chat',
  LEAVE_CHAT: 'leave_chat',
  NEW_MESSAGE: 'new_message',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_TYPING: 'user_typing',
  
  // User Status
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  USER_STATUS_CHANGE: 'user_status_change',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  DASHBOARD: '/dashboard',
  DASHBOARD_CHAT: '/dashboard/chat',
  DASHBOARD_PRODUCTS: '/dashboard/products',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_USERS: '/dashboard/users',
} as const;

// Protected Routes (require authentication)
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_CHAT,
  ROUTES.DASHBOARD_PRODUCTS,
  ROUTES.DASHBOARD_PROFILE,
  ROUTES.DASHBOARD_USERS,
];

// Admin Routes (require admin role)
export const ADMIN_ROUTES = [
  ROUTES.DASHBOARD_USERS,
  ROUTES.DASHBOARD_PRODUCTS,
];

// Public Routes (accessible without authentication)
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
];

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;


