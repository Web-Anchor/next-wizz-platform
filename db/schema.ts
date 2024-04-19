import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').unique().notNull()?.primaryKey(),
  firstName: text('name'),
  lastName: text('last_name'),
  emailAddress: text('emailAddresses').unique().notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
