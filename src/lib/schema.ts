import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export * from './users';

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	userId: text('user_id')
		.references(() => users.id)
		.notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
