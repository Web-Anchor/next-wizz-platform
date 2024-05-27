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

export const templates = sqliteTable('templates', {
  id: text('id').unique().notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  template: text('template'),
  name: text('name'),
  description: text('description'),
  logoUrl: text('logoUrl'),
  memo: text('memo'),
  footer: text('footer'),
  header: text('header'),
  customFields: text('data_typed', { mode: 'json' }).$type<{ a: 1 }>(),
  lineItems: text('line_items'),
  amount: text('amount'),
  total: text('total'),
  currency: text('currency'),
  companyName: text('company_name'),
  invoiceNumber: text('invoice_number'),
  companyAddress: text('company_address'),
  pageSize: text('page_size'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const keys = sqliteTable('keys', {
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

export const tickets = sqliteTable('tickets', {
  id: text('id').unique().notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  subject: text('subject'),
  message: text('message'),
  comments: text('comments'),
  priority: text('priority'),
  status: text('status'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const features = sqliteTable('features', {
  id: text('id').unique().notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  featureName: text('feature_name'),
  description: text('description'),
  comments: text('comments'),
  priority: text('priority'),
  status: text('status'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});
