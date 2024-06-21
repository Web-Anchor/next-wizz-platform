'use server';

import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { templates } from '@db/schema';

export async function dbUserTemplate(props: { id: string }): Promise<any> {
  try {
    const dbTemplates = await db
      .select()
      .from(templates)
      .where(eq(templates.id, props.id));

    return dbTemplates?.[0];
  } catch (error: any) {
    console.log('Error uploading file:', error?.message);
  }
}
