import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request { userId?: string; }

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
        res.status(401).json({ message: 'No token' });
        return;
    }

    try {
        const decoded = verifyToken(auth);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};
