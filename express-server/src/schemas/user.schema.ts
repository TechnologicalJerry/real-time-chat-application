import mongoose, { Schema, Document } from 'mongoose';

/**
 * User Interface
 */
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    dob?: Date;
    password: string;
    profilePicture?: string;
    isActive: boolean;
    isVerified: boolean;
    role: 'user' | 'admin' | 'moderator';
    createdAt: Date;
    updatedAt: Date;
}

/**
 * User Schema
 */
const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'First name must be at least 2 characters'],
            maxlength: [50, 'First name cannot exceed 50 characters']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters'],
            maxlength: [50, 'Last name cannot exceed 50 characters']
        },
        userName: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [30, 'Username cannot exceed 30 characters'],
            match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address'
            ]
        },
        phone: {
            type: String,
            trim: true,
            match: [
                /^[\d\s+()-]*$/,
                'Please provide a valid phone number'
            ]
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other', 'prefer-not-to-say'],
                message: 'Gender must be male, female, other, or prefer-not-to-say'
            }
        },
        dob: {
            type: Date,
            validate: {
                validator: function (value: Date) {
                    const today = new Date();

                    // Check if DOB is not in the future
                    if (value >= today) {
                        return false;
                    }

                    // Calculate age
                    let age = today.getFullYear() - value.getFullYear();
                    const monthDiff = today.getMonth() - value.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate())) {
                        age--;
                    }

                    // Check if user is at least 16 years old
                    return age >= 16;

                },
                message: 'User must be at least 16 years old'
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters']
        },
        profilePicture: {
            type: String,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: {
                values: ['user', 'admin', 'moderator'],
                message: 'Role must be user, admin, or moderator'
            },
            default: 'user'
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        versionKey: false
    }
);

// Remove password from JSON output
UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

export default UserSchema;

