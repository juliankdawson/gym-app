// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // instead of driver: 'pg'
  dbCredentials: {
    url: process.env.DATABASE_URL!, // instead of connectionString
  },
} satisfies Config;
