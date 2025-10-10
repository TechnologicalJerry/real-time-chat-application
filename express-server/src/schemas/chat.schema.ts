import mongoose, { Schema, Document } from 'mongoose';

/**
 * Message/Chat Interface
 */
export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver?: mongoose.Types.ObjectId; // For direct messages
    room?: string; // For group chats
    text: string;
    messageType: 'text' | 'image' | 'file' | 'audio' | 'video';
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    isRead: boolean;
    isEdited: boolean;
    isDeleted: boolean;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Chat (Message) Schema
 */
const ChatSchema: Schema = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Sender is required'],
            index: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true
        },
        room: {
            type: String,
            trim: true,
            index: true
        },
        text: {
            type: String,
            required: [true, 'Message text is required'],
            trim: true,
            maxlength: [5000, 'Message cannot exceed 5000 characters']
        },
        messageType: {
            type: String,
            enum: {
                values: ['text', 'image', 'file', 'audio', 'video'],
                message: 'Message type must be text, image, file, audio, or video'
            },
            default: 'text'
        },
        fileUrl: {
            type: String,
            trim: true
        },
        fileName: {
            type: String,
            trim: true
        },
        fileSize: {
            type: Number,
            min: [0, 'File size cannot be negative']
        },
        isRead: {
            type: Boolean,
            default: false
        },
        isEdited: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        timestamp: {
            type: Date,
            default: Date.now,
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Indexes for better query performance
ChatSchema.index({ sender: 1, timestamp: -1 });
ChatSchema.index({ receiver: 1, timestamp: -1 });
ChatSchema.index({ room: 1, timestamp: -1 });
ChatSchema.index({ createdAt: -1 });

// Ensure populated fields work properly with JSON
ChatSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        return ret;
    }
});

export default ChatSchema;

