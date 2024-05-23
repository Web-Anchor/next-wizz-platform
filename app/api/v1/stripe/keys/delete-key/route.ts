import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Validate user & validate payment plan
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    if (!dbUser.length) {
      return NextResponse.json({ error: 'User not found' });
    }

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    console.log('👤 DB User. Validate User permissions ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Add key to db
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body.id;
    const key = await db
      .delete(strKeys)
      .where(and(eq(strKeys.id, id), eq(strKeys.userId, dbUser[0].id)));
    console.log('🔑 Deleted key ', key);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
