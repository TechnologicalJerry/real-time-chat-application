# API Quick Reference

Quick reference for all API endpoints in the Real-Time Chat Application.

**Base URL:** `http://localhost:5000/api`

🔓 = Public endpoint  
🔒 = Requires authentication (Bearer token)

---

## 🏥 Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | 🔓 | Server health status |

---

## 🔐 Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | 🔓 | Register new user |
| POST | `/api/auth/login` | 🔓 | Login user |

### Register Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "userName": "johndoe123",
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phone": "+1234567890",
  "gender": "male",
  "dob": "1995-05-15"
}
```

### Login Body (Email or Username)
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
OR
```json
{
  "userName": "johndoe123",
  "password": "password123"
}
```

---

## 🔄 Session Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/session` | 🔒 | Get current session/user ID |
| DELETE | `/api/session` | 🔒 | Logout |

---

## 👥 Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/me` | 🔒 | Get current user profile |
| GET | `/api/users` | 🔒 | Get all users (paginated) |
| GET | `/api/users/:id` | 🔒 | Get user by ID |
| GET | `/api/users/search?query=<text>` | 🔒 | Search users |
| POST | `/api/users` | 🔒 | Create new user |
| PUT | `/api/users/:id` | 🔒 | Update user (full) |
| PATCH | `/api/users/:id` | 🔒 | Update user (partial) |
| DELETE | `/api/users/:id` | 🔒 | Delete user |

### Query Parameters
- `page` (optional) - Page number, default: 1
- `limit` (optional) - Items per page, default: 10
- `query` (for search) - Search term

### User Create/Update Body
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "userName": "janesmith",
  "email": "jane@example.com",
  "password": "password456",
  "phone": "+1987654321",
  "gender": "female",
  "dob": "1998-08-20",
  "role": "user",
  "profilePicture": "https://example.com/avatar.jpg"
}
```

---

## 💬 Chat/Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/chat` | 🔒 | Send a message |
| GET | `/api/chat` | 🔒 | Get all messages (paginated) |
| GET | `/api/chat/room/:roomId` | 🔒 | Get room messages |
| GET | `/api/chat/direct/:userId` | 🔒 | Get direct messages with user |
| GET | `/api/chat/unread/count` | 🔒 | Get unread message count |
| PUT | `/api/chat/:messageId` | 🔒 | Update message |
| DELETE | `/api/chat/:messageId` | 🔒 | Delete message |
| PATCH | `/api/chat/read` | 🔒 | Mark messages as read |

### Send Direct Message
```json
{
  "text": "Hello!",
  "messageType": "text",
  "receiver": "USER_ID_HERE"
}
```

### Send Room Message
```json
{
  "text": "Hello everyone!",
  "messageType": "text",
  "room": "general"
}
```

### Send File Message
```json
{
  "text": "Check this out!",
  "messageType": "image",
  "receiver": "USER_ID",
  "fileUrl": "https://example.com/file.jpg",
  "fileName": "file.jpg",
  "fileSize": 256000
}
```

### Message Types
- `text` - Plain text
- `image` - Image files
- `file` - Documents
- `audio` - Audio files
- `video` - Video files

### Mark as Read
```json
{
  "messageIds": ["MESSAGE_ID_1", "MESSAGE_ID_2"]
}
```

### Update Message
```json
{
  "text": "Updated message text"
}
```

---

## 📦 Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | 🔓 | Get all products |
| GET | `/api/products/:id` | 🔓 | Get product by ID |
| POST | `/api/products` | 🔒 | Create product |

### Create Product Body
```json
{
  "name": "Sample Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100
}
```

---

## 🔑 Authentication Header

For protected endpoints (🔒), include:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example with cURL
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/users/me
```

### Example with JavaScript Fetch
```javascript
fetch('http://localhost:5000/api/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

---

## 📊 Response Formats

### Success Response (200/201)
```json
{
  "success": true,
  "data": { /* requested data */ },
  "message": "Operation successful"
}
```

### Error Response (4xx/5xx)
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 🌐 Socket.IO Events

**Connection URL:** `http://localhost:5000`

### Authentication
```javascript
const socket = io('http://localhost:5000', {
  auth: { token: 'YOUR_JWT_TOKEN' }
});
```

### Client → Server Events
- `join-room` - Join chat room
- `leave-room` - Leave chat room
- `send-message` - Send real-time message
- `update-message` - Update message
- `delete-message` - Delete message
- `typing` - Start typing indicator
- `stop-typing` - Stop typing indicator
- `mark-as-read` - Mark messages as read

### Server → Client Events
- `new-message` - New message received
- `message-updated` - Message updated
- `message-deleted` - Message deleted
- `user-joined` - User joined room
- `user-left` - User left room
- `user-typing` - Someone is typing
- `user-stop-typing` - Someone stopped typing
- `messages-read` - Messages marked as read
- `error` - Error notification

---

## 🎯 Common Use Cases

### 1. User Registration Flow
```
1. POST /api/auth/register
2. Receive JWT token
3. Use token for subsequent requests
```

### 2. Login Flow
```
1. POST /api/auth/login
2. Receive JWT token
3. Save token for API calls
```

### 3. Send Direct Message
```
1. GET /api/users/search?query=username (find user)
2. Copy user ID from response
3. POST /api/chat with receiver ID
```

### 4. View Conversation
```
1. GET /api/chat/direct/:userId
2. View messages with pagination
3. PATCH /api/chat/read to mark as read
```

### 5. Real-time Chat
```
1. Connect Socket.IO with JWT token
2. Emit 'join-room' event
3. Emit 'send-message' for instant delivery
4. Listen to 'new-message' for incoming messages
```

---

## 📝 Notes

- All dates should be in ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss.sssZ`
- User must be at least 16 years old (DOB validation)
- Username: 3-30 characters, alphanumeric with hyphens/underscores
- Password: minimum 6 characters
- Message text: maximum 5000 characters
- File size is in bytes

---

## 🔗 Resources

- **Postman Collection:** `postman_collection.json`
- **Postman Environment:** `postman_environment.json`
- **Detailed Guide:** `POSTMAN_GUIDE.md`
- **Full Documentation:** `README.md`

---

**Last Updated:** October 2025

