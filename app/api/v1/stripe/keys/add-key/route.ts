import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { subscription, validateActiveSubMiddleware } from '@lib/subscription';
import { plans } from '@config/index';
import { Plan } from '../../../../../../types/index';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });
    const config = plans[subRes?.product?.name!] as Plan;

    const userKeys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id));

    if (userKeys.length >= config.keyLimit) {
      console.log('🔑 Key limit reached');

      return NextResponse.json({
        error: 'Key limit reached. Please upgrade your plan!',
      });
    }

    // --------------------------------------------------------------------------------
    // 📌  Add key to db
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const key = body.key;
    const name = body.name;
    console.log('🔑 Key: ', key, name);

    const res = await db.insert(strKeys).values({
      id: uuidv4(),
      userId: dbUser[0].id.toString(),
      restrictedAPIKey: key,
      name,
    });
    console.log('🔑 Key added: ', res);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
