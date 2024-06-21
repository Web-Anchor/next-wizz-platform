'use server';

import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { templates } from '@db/schema';

export async function dbUserTemplates(props: { id: string }): Promise<any> {
  try {
    const dbTemplates = await db
      .select()
      .from(templates)
      .where(eq(templates.userId, props.id));

    return dbTemplates;
  } catch (error: any) {
    console.log('Error uploading file:', error?.message);
  }
}
