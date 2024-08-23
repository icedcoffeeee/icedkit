import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull()
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
