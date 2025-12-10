export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';
export const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5050';

export const API_ENDPOINTS = {
    auth: {
        register: '/auth/register',
        login: '/auth/login',
    },
    users: {
        me: '/users/me',
        all: '/users',
        byId: (id: string) => `/users/${id}`,
        search: '/users/search',
    },
    chat: {
        send: '/chat',
        getAll: '/chat',
        room: (roomId: string) => `/chat/room/${roomId}`,
        direct: (userId: string) => `/chat/direct/${userId}`,
        unreadCount: '/chat/unread/count',
        markRead: '/chat/read',
    },
    session: {
        current: '/session',
        logout: '/session',
        logoutAll: '/session/all',
    },
    products: {
        all: '/products',
        byId: (id: string) => `/products/${id}`,
    },
} as const;
