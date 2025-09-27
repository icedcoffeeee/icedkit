import { users } from './users';
export * from './users';

export type User = typeof users.$inferSelect;
