import { db } from './db';
import * as schema from './schema';

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'pg', usePlural: true, schema }),
	emailAndPassword: { enabled: true }
});
