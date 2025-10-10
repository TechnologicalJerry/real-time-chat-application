import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
    getAllUsers,
    getUserById,
    getCurrentUser,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
} from '../controllers/user.controller';

const router = Router();

// Search users (must be before /:id to avoid conflicts)
router.get('/search', authMiddleware, searchUsers);

// Get current user profile
router.get('/me', authMiddleware, getCurrentUser);

// Get all users
router.get('/', authMiddleware, getAllUsers);

// Get user by ID
router.get('/:id', authMiddleware, getUserById);

// Create new user (admin or public registration endpoint)
router.post('/', authMiddleware, createUser);

// Update user
router.put('/:id', authMiddleware, updateUser);

// Partially update user
router.patch('/:id', authMiddleware, updateUser);

// Delete user
router.delete('/:id', authMiddleware, deleteUser);

export default router;

