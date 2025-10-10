import { Router } from 'express';
import {
    sendMessage,
    getChatMessages,
    getRoomMessages,
    getDirectMessages,
    updateMessage,
    deleteMessage,
    markAsRead,
    getUnreadCount
} from '../controllers/chat.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Send a new message
router.post('/', authMiddleware, sendMessage);

// Get all chat messages
router.get('/', authMiddleware, getChatMessages);

// Get unread message count (must be before /:messageId to avoid conflicts)
router.get('/unread/count', authMiddleware, getUnreadCount);

// Get messages for a specific room/group
router.get('/room/:roomId', authMiddleware, getRoomMessages);

// Get direct messages with a specific user
router.get('/direct/:userId', authMiddleware, getDirectMessages);

// Mark messages as read
router.patch('/read', authMiddleware, markAsRead);

// Update a message
router.put('/:messageId', authMiddleware, updateMessage);

// Delete a message
router.delete('/:messageId', authMiddleware, deleteMessage);

export default router;
