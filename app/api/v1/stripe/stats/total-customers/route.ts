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
    console.log('👤 User ', userId);
    // TODO restrict access if no sub expires | Use own Stripe API key

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
    const key = keys.find((k) => k.id === keyId); // 🔑 find key by id

    const apiKey = key ?? keys?.[0]?.restrictedAPIKey; // 🔑 use first key if no keyId
    const stripe = require('stripe')(apiKey);

    // --------------------------------------------------------------------------------
    // 📌  Total Charges for a current month
    // --------------------------------------------------------------------------------
    let totalCustomers = 0;
    let hasMoreCharges = true;
    let startingAfter = undefined;

    while (hasMoreCharges) {
      const customers: any = await stripe.customers.list({
        limit: 100,
        starting_after: startingAfter,
      });

      totalCustomers += customers.data.length;

      if (customers.data.length < 100) {
        hasMoreCharges = false;
      } else {
        startingAfter = customers.data[customers.data.length - 1].id;
      }
    }

    return NextResponse.json({ customers: totalCustomers });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
