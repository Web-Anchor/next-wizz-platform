import { sql } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').unique().notNull().primaryKey(),
  clerkId: text('clerk_id').unique().notNull(),
  stripeSubId: text('stripe_sub_id').unique(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  emailAddress: text('email_addresses').unique().notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
