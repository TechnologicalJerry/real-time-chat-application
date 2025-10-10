import { Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

/**
 * Get all users
 * GET /api/users
 */
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log(`📋 Fetching all users (requested by user: ${req.userId})`);
        
        const users = await User.find()
            .select('-password') // Exclude password field
            .sort({ userName: 1 }); // Sort alphabetically by userName
        
        console.log(`✅ Found ${users.length} users`);
        res.json({ 
            success: true,
            count: users.length,
            users 
        });
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch users',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Get user by ID
 * GET /api/users/:id
 */
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(`👤 Fetching user by ID: ${id}`);
        
        const user = await User.findById(id).select('-password');
        
        if (!user) {
            console.warn(`⚠️  User not found: ${id}`);
            res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
            return;
        }
        
        console.log(`✅ User found: ${user.userName}`);
        res.json({ 
            success: true,
            user 
        });
    } catch (error) {
        console.error('❌ Error fetching user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch user',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Get current user profile
 * GET /api/users/me
 */
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        console.log(`👤 Fetching current user profile: ${userId}`);
        
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            console.warn(`⚠️  User not found: ${userId}`);
            res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
            return;
        }
        
        console.log(`✅ Current user: ${user.userName}`);
        res.json({ 
            success: true,
            user 
        });
    } catch (error) {
        console.error('❌ Error fetching current user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch user profile',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Create a new user
 * POST /api/users
 */
export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, userName, email, phone, gender, dob, password } = req.body;
        
        // Validation - Required fields
        if (!firstName || !lastName || !userName || !email || !password) {
            console.warn('⚠️  Missing required fields');
            res.status(400).json({ 
                success: false,
                message: 'firstName, lastName, userName, email, and password are required' 
            });
            return;
        }
        
        if (password.length < 6) {
            console.warn('⚠️  Password too short');
            res.status(400).json({ 
                success: false,
                message: 'Password must be at least 6 characters long' 
            });
            return;
        }
        
        console.log(`➕ Creating new user: ${userName}`);
        
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
        
        console.log(`✅ User created successfully: ${newUser.userName} (ID: ${newUser._id})`);
        
        // Return user without password
        const userResponse = newUser.toJSON();
        
        res.status(201).json({ 
            success: true,
            message: 'User created successfully',
            user: userResponse 
        });
    } catch (error) {
        console.error('❌ Error creating user:', error);
        
        // Handle mongoose validation errors
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
            message: 'Failed to create user',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Update user
 * PUT /api/users/:id
 */
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { firstName, lastName, userName, email, phone, gender, dob, password } = req.body;
        const currentUserId = req.userId;
        
        console.log(`✏️  Updating user: ${id}`);
        
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            console.warn(`⚠️  User not found: ${id}`);
            res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
            return;
        }
        
        // Check if user is updating their own profile or is admin
        // For now, users can only update their own profile
        if ((user._id as any).toString() !== currentUserId) {
            console.warn(`⚠️  Unauthorized update attempt by user: ${currentUserId}`);
            res.status(403).json({ 
                success: false,
                message: 'You can only update your own profile' 
            });
            return;
        }
        
        // Update fields
        const updateData: any = {};
        
        if (firstName) updateData.firstName = firstName.trim();
        if (lastName) updateData.lastName = lastName.trim();
        
        if (userName) {
            // Check if new username is already taken by another user
            const existingUser = await User.findOne({ 
                userName: userName.toLowerCase(), 
                _id: { $ne: id } 
            });
            
            if (existingUser) {
                console.warn(`⚠️  Username already taken: ${userName}`);
                res.status(409).json({ 
                    success: false,
                    message: 'Username already taken' 
                });
                return;
            }
            
            updateData.userName = userName.toLowerCase().trim();
        }
        
        if (email) {
            // Check if new email is already taken by another user
            const existingEmail = await User.findOne({ 
                email: email.toLowerCase(), 
                _id: { $ne: id } 
            });
            
            if (existingEmail) {
                console.warn(`⚠️  Email already taken: ${email}`);
                res.status(409).json({ 
                    success: false,
                    message: 'Email already registered' 
                });
                return;
            }
            
            updateData.email = email.toLowerCase().trim();
        }
        
        if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
        if (gender) updateData.gender = gender;
        if (dob) updateData.dob = new Date(dob);
        
        if (password) {
            if (password.length < 6) {
                console.warn('⚠️  Password too short');
                res.status(400).json({ 
                    success: false,
                    message: 'Password must be at least 6 characters long' 
                });
                return;
            }
            updateData.password = await bcrypt.hash(password, 10);
        }
        
        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        console.log(`✅ User updated successfully: ${updatedUser?.userName}`);
        
        res.json({ 
            success: true,
            message: 'User updated successfully',
            user: updatedUser 
        });
    } catch (error) {
        console.error('❌ Error updating user:', error);
        
        // Handle mongoose validation errors
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
            message: 'Failed to update user',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Delete user
 * DELETE /api/users/:id
 */
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const currentUserId = req.userId;
        
        console.log(`🗑️  Deleting user: ${id}`);
        
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            console.warn(`⚠️  User not found: ${id}`);
            res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
            return;
        }
        
        // Check if user is deleting their own profile or is admin
        // For now, users can only delete their own profile
        if ((user._id as any).toString() !== currentUserId) {
            console.warn(`⚠️  Unauthorized delete attempt by user: ${currentUserId}`);
            res.status(403).json({ 
                success: false,
                message: 'You can only delete your own profile' 
            });
            return;
        }
        
        // Delete user
        await User.findByIdAndDelete(id);
        
        console.log(`✅ User deleted successfully: ${user.userName} (ID: ${id})`);
        
        res.json({ 
            success: true,
            message: 'User deleted successfully' 
        });
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to delete user',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

/**
 * Search users by username
 * GET /api/users/search?q=username
 */
export const searchUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { q } = req.query;
        
        if (!q || typeof q !== 'string') {
            res.status(400).json({ 
                success: false,
                message: 'Search query is required' 
            });
            return;
        }
        
        console.log(`🔍 Searching users with query: ${q}`);
        
        const users = await User.find({
            $or: [
                { userName: { $regex: q, $options: 'i' } },
                { firstName: { $regex: q, $options: 'i' } },
                { lastName: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } }
            ]
        })
        .select('-password')
        .limit(20) // Limit results
        .sort({ userName: 1 });
        
        console.log(`✅ Found ${users.length} users matching "${q}"`);
        
        res.json({ 
            success: true,
            count: users.length,
            query: q,
            users 
        });
    } catch (error) {
        console.error('❌ Error searching users:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to search users',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

