import { Request, Response } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './auth.utils.js';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length) return res.status(409).json({ error: 'Email already registered' });

  const password_hash = await hashPassword(password);

  const result = await db.insert(users).values({ name, email, password_hash }).returning({ id: users.id, email: users.email });
  const created = result[0];

  const accessToken = generateAccessToken({ userId: created.id, email: created.email });
  const refreshToken = generateRefreshToken({ userId: created.id, email: created.email });

  await db.update(users).set({ refresh_token: refreshToken }).where(eq(users.id, created.id));

  return res.status(201).json({ accessToken, refreshToken });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const found = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = found[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = generateAccessToken({ userId: user.id, email: user.email });
  const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

  await db.update(users).set({ refresh_token: refreshToken }).where(eq(users.id, user.id));

  return res.json({ accessToken, refreshToken });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  // Verify incoming refresh token
  try {
    const payload = verifyRefreshToken(refreshToken);
    const found = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    const user = found[0];
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!user.refresh_token || user.refresh_token !== refreshToken) {
      return res.status(401).json({ error: 'Refresh token invalid' });
    }

    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email });
    const newRefreshToken = generateRefreshToken({ userId: user.id, email: user.email });

    await db.update(users).set({ refresh_token: newRefreshToken }).where(eq(users.id, user.id));

    return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  try {
    const payload = verifyRefreshToken(refreshToken);
    await db.update(users).set({ refresh_token: null }).where(eq(users.id, payload.userId));
    return res.sendStatus(204);
  } catch {
    return res.status(400).json({ error: 'Invalid refresh token' });
  }
}