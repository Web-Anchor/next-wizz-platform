import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

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

    // --------------------------------------------------------------------------------
    // 📌  Total Charges for a current month
    // --------------------------------------------------------------------------------
    let totalCharges = 0;
    let hasMoreCharges = true;
    let startingAfter = undefined;

    while (hasMoreCharges) {
      const charges: any = await stripe.charges.list({
        limit: 100,
        starting_after: startingAfter,
      });

      totalCharges += charges.data.length;

      if (charges.data.length < 100) {
        hasMoreCharges = false;
      } else {
        startingAfter = charges.data[charges.data.length - 1].id;
      }
    }
    console.log('Total Charges:', totalCharges);

    return NextResponse.json({ charges: totalCharges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
