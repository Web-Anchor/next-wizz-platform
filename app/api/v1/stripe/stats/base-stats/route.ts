import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq, gte } from 'drizzle-orm';
import { subscription } from '@lib/subscription';
import { plans } from '@config/index';
import { charges } from '@lib/charges';
import { Plan } from '../../../../../../types';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  User auth
    // --------------------------------------------------------------------------------
    const { userId } = auth();

    // --------------------------------------------------------------------------------
    // 📌  Validate user & validate sub type
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId, dbUser);

    const { name: planName, status } = await subscription({ userId });

    if (status !== 'active') {
      console.log('👤 Subscription not active');
      return NextResponse.json({
        error: 'Subscription not active. Please subscribe!',
      });
    }
    const config = plans[planName] as Plan;

    // --------------------------------------------------------------------------------
    // 📌  Get Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id.toString()));
    console.log('🔑 keys', keys);

    // --------------------------------------------------------------------------------
    // 📌  Get User Customer
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const keyId = body?.keyId;
    const key = keys.find((k) => k.id === keyId)?.restrictedAPIKey; // 🔑 find key by id

    const apiKey = key ?? keys?.[0]?.restrictedAPIKey; // 🔑 use first key if no keyId
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key found' });
    }
    const stripe = require('stripe')(apiKey);

    // --------------------------------------------------------------------------------
    // 📌  Compute stats for user account
    // --------------------------------------------------------------------------------
    const chargesRes = await charges({ apiKey }); // 🔑 get charges & relevant stats
    console.log('🔑 charges', chargesRes);

    return NextResponse.json({ status: 200, charges: chargesRes });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
