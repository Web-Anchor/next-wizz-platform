'use server';

import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';
import { User } from '@appTypes/index';

export async function dbUser(props: { id: string }): Promise<User | any> {
  try {
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, props.id));

    return dbUser;
  } catch (error: any) {
    console.log('Error uploading file:', error?.message);
  }
}
