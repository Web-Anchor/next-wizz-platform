import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
    console.log('👤 User ', userId, dbUser);
    // TODO restrict access if no sub expires | Use own Stripe API key

    // --------------------------------------------------------------------------------
    // 📌  Get Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(stripeKeys)
      .where(eq(stripeKeys.userId, dbUser[0].id.toString()));
    console.log('🔑 keys', keys);

    // --------------------------------------------------------------------------------
    // 📌  Get User Customer
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const keyId = body?.keyId;
    const key = keys.find((k) => k.id === keyId); // 🔑 find key by id

    const apiKey = key ?? keys?.[0]?.restrictedAPIKey; // 🔑 use first key if no keyId
    const stripe = require('stripe')(apiKey);

    const charges = await stripe.charges.list({
      limit: 2,
      // starting_after: 'ch_1JZ9Zv2eZvKYlo2C5Z2ZQ2ZQ',
    });
    console.log('🧾 Charges', charges);

    return NextResponse.json({ charges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
