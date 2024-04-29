import { sql } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const invoiceTemplate = sqliteTable('users', {
  id: text('id').unique().notNull().primaryKey(),
  name: text('name'),
  description: text('description'),
  memo: text('memo'),
  footer: text('footer'),
  amount: text('amount'),
  currency: text('currency'),
  pageSize: text('page_size'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
