import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { signToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: 'User exists' });

        const hash = await bcrypt.hash(password, 10);
        await new User({ username, password: hash }).save();
        res.status(201).json({ message: 'Registered' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }) as (typeof User.prototype & { _id: any, password: string, username: string });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = signToken(user._id.toString());
        res.json({ token, userId: user._id, username: user.username });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};
