import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import Session from '../models/session.model';
import { signToken } from '../utils/jwt';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            phone,
            gender,
            dob,
            password,
            confirmPassword
        } = req.body;

        console.log(`📝 Registration attempt for username: ${userName} and email: ${email}`);

        // Validation - Required fields
        if (!firstName || !lastName || !userName || !email || !password || !confirmPassword) {
            console.warn('⚠️  Missing required fields');
            res.status(400).json({
                success: false,
                message: 'All required fields must be provided',
                required: ['firstName', 'lastName', 'userName', 'email', 'password', 'confirmPassword']
            });
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            console.warn('⚠️  Passwords do not match');
            res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
            return;
        }

        // Validate password length
        if (password.length < 6) {
            console.warn('⚠️  Password too short');
            res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
            return;
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ userName: userName.toLowerCase() });
        if (existingUsername) {
            console.warn(`⚠️  Username already exists: ${userName}`);
            res.status(409).json({
                success: false,
                message: 'Username already taken'
            });
            return;
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            console.warn(`⚠️  Email already exists: ${email}`);
            res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const userData: any = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            userName: userName.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        };

        // Add optional fields if provided
        if (phone) userData.phone = phone.trim();
        if (gender) userData.gender = gender;
        if (dob) userData.dob = new Date(dob);

        // Create user
        const newUser = await new User(userData).save();

        console.log(`✅ User registered successfully: ${newUser.userName} (ID: ${newUser._id})`);

        // Generate JWT token
        const token = signToken((newUser._id as any).toString());

        // Return response without password
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                email: newUser.email,
                phone: newUser.phone,
                gender: newUser.gender,
                dob: newUser.dob
            }
        });
    } catch (err: any) {
        console.error('❌ Registration error:', err);

        // Handle mongoose validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e: any) => e.message);
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, email, password } = req.body;

        // User can login with either username or email
        const identifier = userName || email;

        if (!identifier || !password) {
            console.warn('⚠️  Missing login credentials');
            res.status(400).json({
                success: false,
                message: 'Username/Email and password are required'
            });
            return;
        }

        console.log(`🔐 Login attempt for: ${identifier}`);

        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { userName: identifier.toLowerCase() },
                { email: identifier.toLowerCase() }
            ]
        });

        if (!user) {
            console.warn(`⚠️  User not found: ${identifier}`);
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }

        // Check if user is active
        if (!user.isActive) {
            console.warn(`⚠️  Inactive user attempted login: ${user.userName}`);
            res.status(403).json({
                success: false,
                message: 'Account is deactivated. Please contact support.'
            });
            return;
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn(`⚠️  Invalid password for user: ${identifier}`);
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }

        // Generate JWT token
        const token = signToken((user._id as any).toString());

        // Deactivate all previous active sessions (keep for audit logs)
        try {
            const deactivatedCount = await Session.updateMany(
                { userId: user._id, isActive: true },
                { $set: { isActive: false } }
            );
            
            if (deactivatedCount.modifiedCount > 0) {
                console.log(`📋 Deactivated ${deactivatedCount.modifiedCount} previous session(s) for user: ${user.userName}`);
            }
        } catch (sessionErr: any) {
            console.warn('⚠️  Failed to deactivate previous sessions:', sessionErr.message);
        }

        // Create new active session record
        try {
            const sessionData: any = {
                userId: user._id,
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                deviceInfo: {
                    ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                    deviceType: 'other',
                    browser: req.headers['user-agent'] || 'unknown'
                }
            };

            await new Session(sessionData).save();
            console.log(`✅ New session created for user: ${user.userName}`);
        } catch (sessionErr: any) {
            console.warn('⚠️  Failed to create session:', sessionErr.message);
            // Don't fail login if session creation fails
        }

        console.log(`✅ User logged in successfully: ${user.userName}`);

        // Return response without password
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                dob: user.dob,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (err: any) {
        console.error('❌ Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};
