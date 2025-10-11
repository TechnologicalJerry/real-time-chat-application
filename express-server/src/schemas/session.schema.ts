import mongoose, { Schema, Document } from 'mongoose';

/**
 * Session Interface
 */
export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    deviceInfo?: {
        deviceType?: string;
        browser?: string;
        os?: string;
        ipAddress?: string;
    };
    isActive: boolean;
    expiresAt: Date;
    lastActivity: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Session Schema
 */
const SessionSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true
        },
        token: {
            type: String,
            required: [true, 'Token is required'],
            unique: true,
            index: true
        },
        deviceInfo: {
            deviceType: {
                type: String,
                enum: ['desktop', 'mobile', 'tablet', 'other'],
                default: 'other'
            },
            browser: {
                type: String,
                trim: true
            },
            os: {
                type: String,
                trim: true
            },
            ipAddress: {
                type: String,
                trim: true
            }
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        expiresAt: {
            type: Date,
            required: [true, 'Expiration date is required']
        },
        lastActivity: {
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
SessionSchema.index({ userId: 1, isActive: 1 });
SessionSchema.index({ token: 1, isActive: 1 });

// Auto-delete expired sessions (TTL index - also creates expiresAt index)
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save middleware to update lastActivity
SessionSchema.pre('save', function(next) {
    this.lastActivity = new Date();
    next();
});

export default SessionSchema;

