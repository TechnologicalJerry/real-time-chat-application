import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message';

export const registerSocket = (io: Server) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Auth error'));
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            (socket as any).userId = (decoded as any).userId;
            next();
        } catch {
            next(new Error('Auth error'));
        }
    });

    io.on('connection', socket => {
        socket.on('message', async (text: string) => {
            const userId = (socket as any).userId;
            const msg = new Message({ sender: userId, text });
            await msg.save();

            const full = await msg.populate('sender', 'username');
            io.emit('message', full);
        });
    });
};
