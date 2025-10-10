import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import Chat from '../models/chat.model';
import mongoose from 'mongoose';

/**
 * Send a new message
 * POST /api/chat
 */
export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const currentUserId = req.userId;
        const { receiver, room, text, messageType, fileUrl, fileName, fileSize } = req.body;
        
        console.log(`💬 Sending message from user: ${currentUserId}`);
        
        // Validation
        if (!text || text.trim().length === 0) {
            res.status(400).json({
                success: false,
                message: 'Message text is required'
            });
            return;
        }
        
        // Must have either receiver (for direct message) or room (for group chat)
        if (!receiver && !room) {
            res.status(400).json({
                success: false,
                message: 'Either receiver or room must be specified'
            });
            return;
        }
        
        // Create message object
        const messageData: any = {
            sender: currentUserId,
            text: text.trim(),
            messageType: messageType || 'text'
        };
        
        // Add receiver for direct messages
        if (receiver) {
            if (!mongoose.Types.ObjectId.isValid(receiver)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid receiver ID'
                });
                return;
            }
            messageData.receiver = receiver;
        }
        
        // Add room for group chats
        if (room) {
            messageData.room = room;
        }
        
        // Add file details if provided
        if (fileUrl) messageData.fileUrl = fileUrl;
        if (fileName) messageData.fileName = fileName;
        if (fileSize) messageData.fileSize = fileSize;
        
        // Create and save message
        const newMessage = await new Chat(messageData).save();
        
        // Populate sender and receiver details
        const populatedMessage = await Chat.findById(newMessage._id)
            .populate('sender', 'firstName lastName userName profilePicture')
            .populate('receiver', 'firstName lastName userName profilePicture');
        
        console.log(`✅ Message sent successfully (ID: ${newMessage._id})`);
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: populatedMessage
        });
    } catch (error) {
        console.error('❌ Error sending message:', error);
        
        // Handle validation errors
        if ((error as any).name === 'ValidationError') {
            const errors = Object.values((error as any).errors).map((e: any) => e.message);
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Get all chat messages
 * GET /api/chat
 */
export const getChatMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log('💬 Fetching chat messages');
        
        const { limit = 50, skip = 0 } = req.query;
        
        const messages = await Chat.find({ isDeleted: false })
            .populate('sender', 'firstName lastName userName profilePicture')
            .populate('receiver', 'firstName lastName userName profilePicture')
            .sort({ timestamp: -1 })
            .limit(Number(limit))
            .skip(Number(skip));
        
        console.log(`✅ Found ${messages.length} messages`);
        res.json({
            success: true,
            count: messages.length,
            messages: messages.reverse() // Reverse to show oldest first
        });
    } catch (error) {
        console.error('❌ Error fetching chat messages:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch chat messages' 
        });
    }
};

/**
 * Get chat messages for a specific room
 * GET /api/chat/room/:roomId
 */
export const getRoomMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { roomId } = req.params;
        const { limit = 100, skip = 0 } = req.query;
        console.log(`💬 Fetching messages for room: ${roomId}`);
        
        const messages = await Chat.find({ room: roomId, isDeleted: false })
            .populate('sender', 'firstName lastName userName profilePicture')
            .sort({ timestamp: -1 })
            .limit(Number(limit))
            .skip(Number(skip));
        
        console.log(`✅ Found ${messages.length} messages in room ${roomId}`);
        res.json({
            success: true,
            room: roomId,
            count: messages.length,
            messages: messages.reverse() // Reverse to show oldest first
        });
    } catch (error) {
        console.error('❌ Error fetching room messages:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch room messages' 
        });
    }
};

/**
 * Get direct messages between two users
 * GET /api/chat/direct/:userId
 */
export const getDirectMessages = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const currentUserId = req.userId;
        const { userId } = req.params;
        const { limit = 100, skip = 0 } = req.query;
        
        console.log(`💬 Fetching direct messages between ${currentUserId} and ${userId}`);
        
        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
            return;
        }
        
        const messages = await Chat.find({
            isDeleted: false,
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ]
        })
        .populate('sender', 'firstName lastName userName profilePicture')
        .populate('receiver', 'firstName lastName userName profilePicture')
        .sort({ timestamp: -1 })
        .limit(Number(limit))
        .skip(Number(skip));
        
        console.log(`✅ Found ${messages.length} direct messages`);
        res.json({
            success: true,
            count: messages.length,
            messages: messages.reverse() // Reverse to show oldest first
        });
    } catch (error) {
        console.error('❌ Error fetching direct messages:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch direct messages' 
        });
    }
};

/**
 * Update a message
 * PUT /api/chat/:messageId
 */
export const updateMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const currentUserId = req.userId;
        const { messageId } = req.params;
        const { text } = req.body;
        
        console.log(`✏️  Updating message: ${messageId}`);
        
        // Validation
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid message ID'
            });
            return;
        }
        
        if (!text || text.trim().length === 0) {
            res.status(400).json({
                success: false,
                message: 'Message text is required'
            });
            return;
        }
        
        // Find message
        const message = await Chat.findById(messageId);
        if (!message) {
            res.status(404).json({
                success: false,
                message: 'Message not found'
            });
            return;
        }
        
        // Check if user is the sender
        if (message.sender.toString() !== currentUserId) {
            res.status(403).json({
                success: false,
                message: 'You can only edit your own messages'
            });
            return;
        }
        
        // Check if message is already deleted
        if (message.isDeleted) {
            res.status(400).json({
                success: false,
                message: 'Cannot edit a deleted message'
            });
            return;
        }
        
        // Update message
        message.text = text.trim();
        message.isEdited = true;
        await message.save();
        
        // Populate and return
        const updatedMessage = await Chat.findById(messageId)
            .populate('sender', 'firstName lastName userName profilePicture')
            .populate('receiver', 'firstName lastName userName profilePicture');
        
        console.log(`✅ Message updated successfully`);
        res.json({
            success: true,
            message: 'Message updated successfully',
            data: updatedMessage
        });
    } catch (error) {
        console.error('❌ Error updating message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update message',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Delete a message (soft delete)
 * DELETE /api/chat/:messageId
 */
export const deleteMessage = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const currentUserId = req.userId;
        const { messageId } = req.params;
        
        console.log(`🗑️  Deleting message: ${messageId}`);
        
        // Validation
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid message ID'
            });
            return;
        }
        
        // Find message
        const message = await Chat.findById(messageId);
        if (!message) {
            res.status(404).json({
                success: false,
                message: 'Message not found'
            });
            return;
        }
        
        // Check if user is the sender
        if (message.sender.toString() !== currentUserId) {
            res.status(403).json({
                success: false,
                message: 'You can only delete your own messages'
            });
            return;
        }
        
        // Soft delete
        message.isDeleted = true;
        message.text = 'This message has been deleted';
        await message.save();
        
        console.log(`✅ Message deleted successfully`);
        res.json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete message',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Mark message(s) as read
 * PATCH /api/chat/read
 */
export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const currentUserId = req.userId;
        const { messageIds, userId, room } = req.body;
        
        console.log(`📖 Marking messages as read`);
        
        let updateQuery: any = {
            receiver: currentUserId,
            isRead: false
        };
        
        // Mark specific messages
        if (messageIds && Array.isArray(messageIds)) {
            updateQuery._id = { $in: messageIds };
        }
        // Mark all messages from a specific user
        else if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
                return;
            }
            updateQuery.sender = userId;
        }
        // Mark all messages in a room
        else if (room) {
            updateQuery.room = room;
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Either messageIds, userId, or room must be provided'
            });
            return;
        }
        
        // Update messages
        const result = await Chat.updateMany(updateQuery, { isRead: true });
        
        console.log(`✅ Marked ${result.modifiedCount} messages as read`);
        res.json({
            success: true,
            message: `Marked ${result.modifiedCount} message(s) as read`,
            count: result.modifiedCount
        });
    } catch (error) {
        console.error('❌ Error marking messages as read:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark messages as read',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Get unread message count
 * GET /api/chat/unread/count
 */
export const getUnreadCount = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const currentUserId = req.userId;
        
        console.log(`📊 Getting unread message count for user: ${currentUserId}`);
        
        const count = await Chat.countDocuments({
            receiver: currentUserId,
            isRead: false,
            isDeleted: false
        });
        
        console.log(`✅ User has ${count} unread messages`);
        res.json({
            success: true,
            unreadCount: count
        });
    } catch (error) {
        console.error('❌ Error getting unread count:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get unread count',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};
