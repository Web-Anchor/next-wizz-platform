import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const stripeKeys = sqliteTable('stripe_keys', {
  id: text('id').unique().notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  stripeSecretKey: text('stripe_secret_key'),
  stripePublishableKey: text('stripe_publishable_key'),
  restrictedAPIKey: text('restricted_api_key'),
  name: text('name'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
