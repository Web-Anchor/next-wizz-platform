import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

export async function POST(request: NextRequest) {
  try {
    auth().protect();

    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId, dbUser);

    if (!dbUser.length) {
      return NextResponse.json({ error: 'User not found' });
    }

    // --------------------------------------------------------------------------------
    // 📌  Retrieve User API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(stripeKeys)
      .where(eq(stripeKeys.userId, dbUser[0].id.toString()));

    return NextResponse.json({ keys });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
