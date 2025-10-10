import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import Chat from '../models/chat.model';

interface AuthSocket extends Socket {
    userId?: string;
}

interface MessageData {
    receiver?: string;
    room?: string;
    text: string;
    messageType?: 'text' | 'image' | 'file' | 'audio' | 'video';
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
}

interface TypingData {
    room?: string;
    receiver?: string;
}

export const registerSocket = (io: Server) => {
    // Socket authentication middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            console.warn('⚠️  Socket connection rejected: No token provided');
            return next(new Error('Authentication required'));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
            (socket as AuthSocket).userId = decoded.userId;
            console.log(`✅ Socket authenticated: User ${decoded.userId}`);
            next();
        } catch (error) {
            console.warn('⚠️  Socket connection rejected: Invalid token');
            next(new Error('Invalid token'));
        }
    });

    // Socket connection handler
    io.on('connection', (socket: AuthSocket) => {
        const userId = socket.userId;
        console.log(`🔌 Client connected: ${socket.id} (User: ${userId})`);
        console.log(`📊 Total connected clients: ${io.engine.clientsCount}`);

        // User joins their personal room for direct messages
        if (userId) {
            socket.join(`user:${userId}`);
            console.log(`👤 User ${userId} joined personal room`);
        }

        // Join a chat room
        socket.on('join-room', (roomId: string) => {
            socket.join(`room:${roomId}`);
            console.log(`🚪 User ${userId} joined room: ${roomId}`);
            socket.to(`room:${roomId}`).emit('user-joined', { userId, roomId });
        });

        // Leave a chat room
        socket.on('leave-room', (roomId: string) => {
            socket.leave(`room:${roomId}`);
            console.log(`🚪 User ${userId} left room: ${roomId}`);
            socket.to(`room:${roomId}`).emit('user-left', { userId, roomId });
        });

        // Handle incoming chat messages
        socket.on('send-message', async (data: MessageData) => {
            try {
                const { receiver, room, text, messageType, fileUrl, fileName, fileSize } = data;
                
                if (!text || text.trim().length === 0) {
                    socket.emit('error', { message: 'Message text is required' });
                    return;
                }

                if (!receiver && !room) {
                    socket.emit('error', { message: 'Either receiver or room must be specified' });
                    return;
                }

                console.log(`💬 Message from ${userId}: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
                
                // Create message object
                const messageData: any = {
                    sender: userId,
                    text: text.trim(),
                    messageType: messageType || 'text'
                };

                if (receiver) messageData.receiver = receiver;
                if (room) messageData.room = room;
                if (fileUrl) messageData.fileUrl = fileUrl;
                if (fileName) messageData.fileName = fileName;
                if (fileSize) messageData.fileSize = fileSize;

                // Save message to database
                const msg = await new Chat(messageData).save();
                const populatedMsg = await msg.populate('sender', 'firstName lastName userName profilePicture');

                // Emit to appropriate recipients
                if (room) {
                    // Broadcast to room
                    io.to(`room:${room}`).emit('new-message', populatedMsg);
                    console.log(`✅ Message sent to room: ${room}`);
                } else if (receiver) {
                    // Send to specific user and sender
                    io.to(`user:${receiver}`).emit('new-message', populatedMsg);
                    socket.emit('new-message', populatedMsg);
                    console.log(`✅ Direct message sent to user: ${receiver}`);
                }
            } catch (error) {
                console.error('❌ Error handling message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Handle message update
        socket.on('update-message', async ({ messageId, text }: { messageId: string; text: string }) => {
            try {
                const message = await Chat.findById(messageId);
                
                if (!message) {
                    socket.emit('error', { message: 'Message not found' });
                    return;
                }

                if (message.sender.toString() !== userId) {
                    socket.emit('error', { message: 'You can only edit your own messages' });
                    return;
                }

                if (message.isDeleted) {
                    socket.emit('error', { message: 'Cannot edit deleted message' });
                    return;
                }

                message.text = text.trim();
                message.isEdited = true;
                await message.save();

                const updatedMsg = await message.populate('sender', 'firstName lastName userName profilePicture');

                // Emit update to appropriate recipients
                if (message.room) {
                    io.to(`room:${message.room}`).emit('message-updated', updatedMsg);
                } else if (message.receiver) {
                    io.to(`user:${message.receiver.toString()}`).emit('message-updated', updatedMsg);
                    socket.emit('message-updated', updatedMsg);
                }

                console.log(`✅ Message ${messageId} updated`);
            } catch (error) {
                console.error('❌ Error updating message:', error);
                socket.emit('error', { message: 'Failed to update message' });
            }
        });

        // Handle message deletion
        socket.on('delete-message', async (messageId: string) => {
            try {
                const message = await Chat.findById(messageId);
                
                if (!message) {
                    socket.emit('error', { message: 'Message not found' });
                    return;
                }

                if (message.sender.toString() !== userId) {
                    socket.emit('error', { message: 'You can only delete your own messages' });
                    return;
                }

                message.isDeleted = true;
                message.text = 'This message has been deleted';
                await message.save();

                // Emit deletion to appropriate recipients
                if (message.room) {
                    io.to(`room:${message.room}`).emit('message-deleted', { messageId });
                } else if (message.receiver) {
                    io.to(`user:${message.receiver.toString()}`).emit('message-deleted', { messageId });
                    socket.emit('message-deleted', { messageId });
                }

                console.log(`✅ Message ${messageId} deleted`);
            } catch (error) {
                console.error('❌ Error deleting message:', error);
                socket.emit('error', { message: 'Failed to delete message' });
            }
        });

        // Handle typing indicator
        socket.on('typing', (data: TypingData) => {
            const { room, receiver } = data;
            
            if (room) {
                socket.to(`room:${room}`).emit('user-typing', { userId, room });
            } else if (receiver) {
                io.to(`user:${receiver}`).emit('user-typing', { userId });
            }
        });

        // Handle stop typing indicator
        socket.on('stop-typing', (data: TypingData) => {
            const { room, receiver } = data;
            
            if (room) {
                socket.to(`room:${room}`).emit('user-stop-typing', { userId, room });
            } else if (receiver) {
                io.to(`user:${receiver}`).emit('user-stop-typing', { userId });
            }
        });

        // Handle mark as read
        socket.on('mark-as-read', async ({ messageIds, senderId, room }: { 
            messageIds?: string[]; 
            senderId?: string; 
            room?: string;
        }) => {
            try {
                let updateQuery: any = {
                    receiver: userId,
                    isRead: false
                };

                if (messageIds) {
                    updateQuery._id = { $in: messageIds };
                } else if (senderId) {
                    updateQuery.sender = senderId;
                } else if (room) {
                    updateQuery.room = room;
                }

                const result = await Chat.updateMany(updateQuery, { isRead: true });

                // Notify the sender that their messages were read
                if (senderId) {
                    io.to(`user:${senderId}`).emit('messages-read', { 
                        readBy: userId, 
                        count: result.modifiedCount 
                    });
                }

                console.log(`✅ Marked ${result.modifiedCount} messages as read for user ${userId}`);
            } catch (error) {
                console.error('❌ Error marking messages as read:', error);
                socket.emit('error', { message: 'Failed to mark messages as read' });
            }
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`🔌 Client disconnected: ${socket.id} (Reason: ${reason})`);
            console.log(`📊 Total connected clients: ${io.engine.clientsCount}`);
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error(`❌ Socket error for ${socket.id}:`, error);
        });
    });
};
