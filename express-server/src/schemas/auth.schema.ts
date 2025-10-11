import mongoose, { Schema, Document } from 'mongoose';

/**
 * Auth Token Interface (for refresh tokens, password reset tokens, etc.)
 */
export interface IAuthToken extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    tokenType: 'refresh' | 'passwordReset' | 'emailVerification';
    isUsed: boolean;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Auth Token Schema
 */
const AuthTokenSchema: Schema = new Schema(
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
        tokenType: {
            type: String,
            required: [true, 'Token type is required'],
            enum: {
                values: ['refresh', 'passwordReset', 'emailVerification'],
                message: 'Token type must be refresh, passwordReset, or emailVerification'
            },
            index: true
        },
        isUsed: {
            type: Boolean,
            default: false,
            index: true
        },
        expiresAt: {
            type: Date,
            required: [true, 'Expiration date is required']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Indexes for better query performance
AuthTokenSchema.index({ userId: 1, tokenType: 1 });
AuthTokenSchema.index({ token: 1, isUsed: 1 });

// Auto-delete expired tokens (TTL index - also creates expiresAt index)
AuthTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual property to check if token is valid
AuthTokenSchema.virtual('isValid').get(function(this: IAuthToken) {
    return !this.isUsed && this.expiresAt > new Date();
});

// Ensure virtuals are included in JSON output
AuthTokenSchema.set('toJSON', {
    virtuals: true
});

export default AuthTokenSchema;

