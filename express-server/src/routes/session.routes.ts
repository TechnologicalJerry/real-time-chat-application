import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getCurrentSessions, getSessionHistory, logout, logoutAll } from '../controllers/session.controller';

const router = Router();

// Get session history (active + inactive for audit logs)
router.get('/history', authMiddleware, getSessionHistory);

// Get current user's active sessions
router.get('/', authMiddleware, getCurrentSessions);

// Logout from current device
router.delete('/', authMiddleware, logout);

// Logout from all devices
router.delete('/all', authMiddleware, logoutAll);

export default router;

