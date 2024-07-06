import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    auth().protect();

    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId);

    if (!dbUser.length) {
      return NextResponse.json({ error: 'User not found' });
    }

    // --------------------------------------------------------------------------------
    // 📌  Retrieve User API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select({
        id: strKeys.id,
        name: strKeys.name,
        userId: strKeys.userId,
        restrictedAPIKey: strKeys.restrictedAPIKey,
        createdAt: strKeys.createdAt,
      })
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id.toString()));

    return NextResponse.json({ keys });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
