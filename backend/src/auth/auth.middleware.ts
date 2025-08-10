// src/auth/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './auth.utils';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });

  const token = header.split(' ')[1];
  try {
    const payload = verifyAccessToken(token); // throws on invalid/expired
    // attach user to request
    (req as any).user = { userId: payload.userId, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
