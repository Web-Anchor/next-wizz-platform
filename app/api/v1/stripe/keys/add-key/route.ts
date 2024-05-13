import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';
import { v4 as uuidv4 } from 'uuid';

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
    const key = body.key;
    const name = body.name;

    await db.insert(stripeKeys).values({
      id: uuidv4(),
      userId: dbUser[0].id.toString(),
      restrictedAPIKey: key,
      name,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
