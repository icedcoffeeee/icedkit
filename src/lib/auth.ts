import { db } from './db';
import { sessions, users } from './schema';

import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';

import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
export const lucia = new Lucia(adapter, {
	sessionCookie: { attributes: { secure: !dev } }
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
		DatabaseUserAttributes: { email: string };
	}
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
