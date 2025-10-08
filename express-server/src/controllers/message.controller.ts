import { Request, Response } from 'express';
import Message from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find()
            .populate('sender', 'username')
            .sort({ timestamp: 1 });
        res.json(messages);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};
