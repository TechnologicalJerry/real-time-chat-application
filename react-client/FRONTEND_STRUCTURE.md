# React Client - Final File Structure

Complete file and folder structure for the Next.js React client connecting to Express backend.

```
react-client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx                  # Auth layout (no sidebar)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (main)/
│   │   │   ├── layout.tsx                  # Main layout (header/footer)
│   │   │   ├── page.tsx                    # Home page
│   │   │   └── about/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                  # Dashboard layout (with side-nav)
│   │   │   └── dashboard/
│   │   │       ├── page.tsx                # Dashboard home
│   │   │       ├── profile/
│   │   │       │   └── page.tsx
│   │   │       └── chat/
│   │   │           ├── page.tsx            # Chat list view
│   │   │           └── [chatId]/
│   │   │               └── page.tsx        # Individual chat window
│   │   │
│   │   ├── layout.tsx                      # Root layout
│   │   ├── globals.css                     # Global styles
│   │   ├── not-found.tsx                   # 404 page
│   │   └── loading.tsx                     # Global loading UI
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SideNav.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── ForgotPasswordForm.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardStats.tsx
│   │   │   └── DashboardCard.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   └── ProfileAvatar.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatList.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── MessageStatus.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── Spinner.tsx
│   │       └── Toast.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                   # Axios instance with interceptors
│   │   │   ├── auth.api.ts                 # POST /auth/register, /auth/login
│   │   │   ├── user.api.ts                 # GET /users, /users/me, etc.
│   │   │   ├── chat.api.ts                 # REST chat endpoints
│   │   │   ├── product.api.ts              # Product endpoints
│   │   │   └── session.api.ts              # Session management
│   │   │
│   │   ├── socket/
│   │   │   ├── socket.ts                   # Socket.IO connection setup
│   │   │   └── chat.socket.ts              # Chat socket event handlers
│   │   │
│   │   ├── auth.ts                         # Token management utilities
│   │   └── utils.ts                        # General utilities (cn, formatDate, etc.)
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                      # Authentication hook
│   │   ├── useChat.ts                      # Chat data hook
│   │   ├── useSocket.ts                    # Socket.IO hook
│   │   ├── useDashboard.ts                 # Dashboard data hook
│   │   └── useDebounce.ts                  # Debounce utility hook
│   │
│   ├── services/
│   │   ├── auth.service.ts                 # Auth service (combines API + logic)
│   │   ├── chat.service.ts                 # Chat service (API + Socket.IO)
│   │   ├── user.service.ts                 # User service
│   │   └── product.service.ts              # Product service
│   │
│   ├── providers/
│   │   ├── AuthProvider.tsx                # Auth context provider
│   │   ├── SocketProvider.tsx              # Socket.IO context provider
│   │   └── ThemeProvider.tsx               # Theme context (optional)
│   │
│   ├── types/
│   │   ├── auth.ts                         # Auth types (User, LoginRequest, etc.)
│   │   ├── chat.ts                         # Chat types (Message, ChatRoom, etc.)
│   │   ├── user.ts                         # User types
│   │   ├── product.ts                      # Product types
│   │   └── api.ts                          # API response types
│   │
│   ├── constants/
│   │   ├── api.ts                          # API endpoints & base URLs
│   │   ├── routes.ts                       # Frontend route paths
│   │   └── config.ts                       # App configuration
│   │
│   └── middleware.ts                       # Next.js middleware (auth protection)
│
├── public/
│   ├── images/
│   │   └── .gitkeep
│   ├── icons/
│   │   └── .gitkeep
│   └── favicon.ico
│
├── .env.local                              # Environment variables
├── .env.example                            # Example env file
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
└── README.md
```

## Key Features

### Route Groups
- `(auth)` - Authentication pages (login, signup, forgot-password)
- `(main)` - Public pages (home, about)
- `(dashboard)` - Protected dashboard pages

### API Integration
- `lib/api/` - REST API client for Express backend
- `lib/socket/` - Socket.IO client for real-time features
- `services/` - Service layer combining API + Socket.IO

### State Management
- `providers/` - React Context providers
- `hooks/` - Custom React hooks

### Type Safety
- `types/` - TypeScript type definitions matching Express backend

### Constants
- `constants/api.ts` - All API endpoints in one place
- `constants/routes.ts` - Frontend route paths

## Environment Variables (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Real-Time Chat Application
```

## Required Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.8",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "axios": "^1.6.0",
    "socket.io-client": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "^16.0.8"
  }
}
```

