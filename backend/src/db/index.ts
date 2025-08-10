// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env');
}

const sql = postgres(process.env.DATABASE_URL, { ssl: false /* local dev */ });

export const db = drizzle(sql);
