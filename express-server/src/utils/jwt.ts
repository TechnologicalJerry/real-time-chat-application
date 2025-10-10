import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (userId: string) =>
    jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string): { userId: string } =>
    jwt.verify(token, JWT_SECRET) as { userId: string };
