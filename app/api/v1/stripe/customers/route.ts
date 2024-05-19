import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  User auth
    // --------------------------------------------------------------------------------
    const { userId } = auth();

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  User validation
    // --------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------
    // 📌  Get Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id));
    console.log('🔑 keys', keys);

    // --------------------------------------------------------------------------------
    // 📌  Get User Customer
    // --------------------------------------------------------------------------------
    const apiKey = keys?.[0]?.restrictedAPIKey;
    const stripe = require('stripe')(apiKey);

    const customers = await stripe?.customers?.list({
      limit: 2,
    });
    console.log('🧾 Customers', customers);

    return NextResponse.json({ customers });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
