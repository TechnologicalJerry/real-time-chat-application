import { Response } from 'express';
import Session from '../models/session.model';
import { AuthRequest } from '../middleware/auth.middleware';

/**
 * Get current user's active sessions
 * GET /api/session
 */
export const getCurrentSessions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
            return;
        }

        // Get all active sessions for the user
        const sessions = await Session.find({ 
            userId, 
            isActive: true,
            expiresAt: { $gt: new Date() }
        }).sort({ lastActivity: -1 });

        res.json({
            success: true,
            sessions,
            count: sessions.length
        });
    } catch (err: any) {
        console.error('❌ Error fetching sessions:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching sessions',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * Get all user's sessions (including inactive - for audit logs)
 * GET /api/session/history
 */
export const getSessionHistory = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
            return;
        }

        // Get all sessions (active and inactive) for audit
        const sessions = await Session.find({ userId })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50 sessions

        const activeSessions = sessions.filter(s => s.isActive);
        const inactiveSessions = sessions.filter(s => !s.isActive);

        res.json({
            success: true,
            sessions,
            stats: {
                total: sessions.length,
                active: activeSessions.length,
                inactive: inactiveSessions.length
            }
        });
    } catch (err: any) {
        console.error('❌ Error fetching session history:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching session history',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * Logout - Deactivate current session
 * DELETE /api/session
 */
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!userId || !token) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
            return;
        }

        // Find and deactivate the current session
        const session = await Session.findOne({ userId, token, isActive: true });

        if (session) {
            session.isActive = false;
            await session.save();
            console.log(`✅ User logged out: ${userId}`);
        }

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (err: any) {
        console.error('❌ Logout error:', err);
        res.status(500).json({
            success: false,
            message: 'Error during logout',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

/**
 * Logout from all devices - Deactivate all sessions
 * DELETE /api/session/all
 */
export const logoutAll = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
            return;
        }

        // Deactivate all active sessions for the user
        const result = await Session.updateMany(
            { userId, isActive: true },
            { $set: { isActive: false } }
        );

        console.log(`✅ User logged out from all devices: ${userId} (${result.modifiedCount} sessions)`);

        res.json({
            success: true,
            message: 'Logged out from all devices successfully',
            sessionsDeactivated: result.modifiedCount
        });
    } catch (err: any) {
        console.error('❌ Logout all error:', err);
        res.status(500).json({
            success: false,
            message: 'Error during logout',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

