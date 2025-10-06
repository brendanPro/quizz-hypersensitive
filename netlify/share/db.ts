import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@netlify/neon';

export function getDb() {
  const connectionString = process.env.NETLIFY_DATABASE_URL_UNPOOLED ?? process.env.NETLIFY_DATABASE_URL;
  if (!connectionString) throw new Error('Missing NETLIFY_DATABASE_URL[_UNPOOLED]');
  const sql = neon(connectionString);
  return drizzle({ client: sql });
}


