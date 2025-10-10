# Real-Time Chat Application - Express Server

A real-time chat application backend built with Express, TypeScript, Socket.IO, and MongoDB.

## 🚀 Features

- **Real-time messaging** with Socket.IO (rooms & direct messages)
- **User authentication** with JWT
- **RESTful API** endpoints
- **MongoDB** database integration with Mongoose schemas
- **TypeScript** for type safety
- **Message features**: Edit, Delete, Read receipts, Typing indicators
- **Comprehensive logging** for monitoring
- **Graceful shutdown** handling
- **CORS configuration** for secure cross-origin requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd express-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=9000
   NODE_ENV=development

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/chat-application

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # CORS Configuration (optional)
   CORS_ORIGIN=http://localhost:3000
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with auto-reload on file changes.

### Production Mode
```bash
# Build TypeScript
npm run build

# Start the server
npm start
```

### Other Commands
```bash
# Watch mode (compile on changes)
npm run watch

# Clean build directory
npm run clean

# Run tests
npm test
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Session
- `GET /api/session` - Get current session (protected)
- `DELETE /api/session` - Logout (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/me` - Get current user profile (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `GET /api/users/search?q=<query>` - Search users by username (protected)
- `POST /api/users` - Create new user (protected)
- `PUT /api/users/:id` - Update user (protected, self-only)
- `PATCH /api/users/:id` - Partially update user (protected, self-only)
- `DELETE /api/users/:id` - Delete user (protected, self-only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)

### Chat (Real-time Messaging)
- `POST /api/chat` - Send a message (protected)
- `GET /api/chat` - Get all messages with pagination (protected)
- `GET /api/chat/room/:roomId` - Get room messages (protected)
- `GET /api/chat/direct/:userId` - Get direct messages with a user (protected)
- `GET /api/chat/unread/count` - Get unread message count (protected)
- `PUT /api/chat/:messageId` - Update a message (protected)
- `DELETE /api/chat/:messageId` - Delete a message (protected)
- `PATCH /api/chat/read` - Mark messages as read (protected)

### Health Check
- `GET /health` - Server health status

## 🧪 API Testing with Postman

A complete Postman collection is included for easy API testing!

### Quick Start

1. **Import the collection and environment:**
   - Open Postman
   - Click **Import** button
   - Upload `postman_collection.json` and `postman_environment.json`
   - Select the **Real-Time Chat - Development** environment

2. **Start testing:**
   - Ensure your server is running (`npm run dev`)
   - Run the **Health Check** request to verify
   - **Register** or **Login** to get an auth token (automatically saved)
   - Test any authenticated endpoint

### Files Included

- `postman_collection.json` - Complete API collection with all endpoints
- `postman_environment.json` - Development environment variables
- `postman_environment_production.json` - Production environment template
- `POSTMAN_GUIDE.md` - Detailed testing guide and workflows

### Features

✅ **Auto-token management** - JWT tokens automatically saved after login  
✅ **All endpoints covered** - Auth, Users, Chat, Products, Session  
✅ **Request examples** - Pre-filled with sample data  
✅ **Environment variables** - Easy switching between dev/prod  
✅ **Test scripts** - Automatic variable extraction from responses  

👉 **For detailed instructions, see [POSTMAN_GUIDE.md](./POSTMAN_GUIDE.md)**

## 🔌 Socket.IO Real-time Events

### Client → Server Events
- `join-room` - Join a chat room
- `leave-room` - Leave a chat room
- `send-message` - Send a real-time message
- `update-message` - Update a message in real-time
- `delete-message` - Delete a message in real-time
- `typing` - Indicate typing status
- `stop-typing` - Stop typing indicator
- `mark-as-read` - Mark messages as read

### Server → Client Events
- `new-message` - Receive a new message
- `message-updated` - Message was updated
- `message-deleted` - Message was deleted
- `user-joined` - User joined a room
- `user-left` - User left a room
- `user-typing` - Someone is typing
- `user-stop-typing` - Someone stopped typing
- `messages-read` - Your messages were read
- `error` - Error notifications

### Authentication
Socket connections require JWT token:
```javascript
const socket = io('http://localhost:9000', {
  auth: {
    token: 'your-jwt-token'
  }
});

// Join a room
socket.emit('join-room', 'general');

// Send a message
socket.emit('send-message', {
  room: 'general',
  text: 'Hello everyone!'
});

// Listen for new messages
socket.on('new-message', (message) => {
  console.log('New message:', message);
});
```

📚 **For detailed chat documentation, see:**
- [CHAT_API_DOCUMENTATION.md](./CHAT_API_DOCUMENTATION.md) - Complete REST API reference
- [CHAT_SOCKET_EVENTS.md](./CHAT_SOCKET_EVENTS.md) - Socket events quick reference

## 📊 Terminal Monitoring

The server provides comprehensive console logging with emoji indicators for easy monitoring:

### Server Startup
```
🚀 Starting server...
📋 Environment: development
✅ Environment variables validated
✅ Express app created
✅ Socket.IO configured
📡 Connecting to MongoDB...
✅ MongoDB connected successfully
📍 Database: chat-application
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Server is running successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Local:    http://localhost:9000
📍 Health:   http://localhost:9000/health
📍 API:      http://localhost:9000/api
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Monitoring requests...
```

### Request Logging
```
📨 [2025-10-09T12:00:00.000Z] POST /api/auth/login
```

### Socket Events
```
✅ Socket authenticated: User 123abc
🔌 Client connected: abc123xyz (User: 123abc)
📊 Total connected clients: 1
💬 Message received from 123abc: Hello, World!
✅ Message broadcasted to all clients
🔌 Client disconnected: abc123xyz (Reason: transport close)
```

### Database Events
```
📡 Connecting to MongoDB...
✅ MongoDB connected successfully
⚠️  MongoDB disconnected
🔄 MongoDB reconnected
```

### Error Logging
```
❌ Error: Something went wrong
📍 Stack: Error: Something went wrong at...
⚠️  404 - Route not found: GET /api/unknown
```

### Shutdown
```
⚠️  SIGINT received, shutting down gracefully...
✅ HTTP server closed
✅ Socket.IO closed
✅ MongoDB connection closed
👋 Server shutdown complete
```

## 🏗️ Project Structure

```
express-server/
├── src/
│   ├── config/
│   │   └── database.ts           # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.ts    # Registration & login
│   │   ├── chat.controller.ts    # Chat/messaging
│   │   ├── user.controller.ts    # User management
│   │   ├── session.controller.ts # Session management
│   │   └── product.controller.ts # Product management
│   ├── middleware/
│   │   └── auth.middleware.ts    # JWT authentication
│   ├── models/
│   │   ├── index.ts              # Model exports
│   │   ├── user.model.ts         # User model
│   │   ├── chat.model.ts         # Chat/message model
│   │   ├── auth.model.ts         # Auth token model
│   │   ├── session.model.ts      # Session model
│   │   └── product.model.ts      # Product model
│   ├── schemas/
│   │   ├── index.ts              # Schema exports
│   │   ├── user.schema.ts        # User schema & validation
│   │   ├── chat.schema.ts        # Chat schema & validation
│   │   ├── auth.schema.ts        # Auth token schema
│   │   ├── session.schema.ts     # Session schema
│   │   └── product.schema.ts     # Product schema
│   ├── routes/
│   │   ├── index.routes.ts       # Main route aggregator
│   │   ├── auth.routes.ts        # Auth routes
│   │   ├── chat.routes.ts        # Chat routes
│   │   ├── user.routes.ts        # User routes
│   │   ├── session.routes.ts     # Session routes
│   │   └── product.routes.ts     # Product routes
│   ├── socket/
│   │   └── index.ts              # Socket.IO real-time events
│   ├── types/
│   │   └── index.d.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── jwt.ts                # JWT utilities
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── .env                          # Environment variables (create from .env.template)
├── .gitignore
├── package.json
├── tsconfig.json
├── nodemon.json
├── README.md
├── CHAT_API_DOCUMENTATION.md     # Complete chat API docs
├── CHAT_SOCKET_EVENTS.md         # Socket events reference
├── AUTH_API_DOCUMENTATION.md     # Authentication docs
├── USER_API_DOCUMENTATION.md     # User management docs
├── CORS_CONFIGURATION.md         # CORS setup guide
├── NAMING_CONVENTIONS.md         # Code style guide
└── SCHEMAS_DOCUMENTATION.md      # Schema reference
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Environment variable validation
- Protected routes with middleware

## 🐛 Troubleshooting

### Environment Variables Missing
```
❌ Missing required environment variables: MONGO_URI, JWT_SECRET
💡 Please create a .env file with the required variables
```
**Solution:** Create a `.env` file with all required variables.

### MongoDB Connection Error
```
❌ DB connection error: MongoServerError...
💡 Please check your MONGO_URI environment variable
```
**Solution:** Verify MongoDB is running and the connection string is correct.

### Socket Authentication Failed
```
⚠️  Socket connection rejected: Invalid token
```
**Solution:** Ensure you're sending a valid JWT token in the socket auth object.

## 📝 License

MIT

## 👤 Author

technojerry

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📫 Support

For support, please open an issue on GitHub.

