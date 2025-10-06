import { pgTable, text, timestamp, integer, jsonb, uuid } from 'drizzle-orm/pg-core';

export const results = pgTable('results', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  token: text('token'),
  email: text('email'),
  scoreTotal: integer('score_total').notNull(),
  answers: jsonb('answers'),
});

export type InsertResult = typeof results.$inferInsert;
export type SelectResult = typeof results.$inferSelect;


