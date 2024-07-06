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
    // 📌  Total Customer for a current month
    // --------------------------------------------------------------------------------
    let currentTotalCustomers = 0;
    let currentHasMoreCharges = true;
    let currentStartingAfter = undefined;

    while (currentHasMoreCharges) {
      const customers: any = await stripe.customers.list({
        limit: 100,
        starting_after: currentStartingAfter,
        created: {
          gte:
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ).getTime() / 1000, // 📅 1st of the month
        },
      });

      currentTotalCustomers += customers.data.length;

      if (customers.data.length < 100) {
        currentHasMoreCharges = false;
      } else {
        currentStartingAfter = customers.data[customers.data.length - 1].id;
      }
    }

    // --------------------------------------------------------------------------------
    // 📌  Total Customers for the previous month
    // --------------------------------------------------------------------------------
    let previousTotalCustomers = 0;
    let previousHasMoreCharges = true;
    let previousStartingAfter = undefined;

    while (previousHasMoreCharges) {
      const customers: any = await stripe.customers.list({
        limit: 100,
        starting_after: previousStartingAfter,
        created: {
          gte:
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1
            ).getTime() / 1000, // 📅 1st of the previous month
          lt:
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ).getTime() / 1000, // 📅 1st of the current month
        },
      });

      previousTotalCustomers += customers.data.length;

      if (customers.data.length < 100) {
        previousHasMoreCharges = false;
      } else {
        previousStartingAfter = customers.data[customers.data.length - 1].id;
      }
    }

    const growthPercentage = !!previousTotalCustomers
      ? Math.round(
          ((currentTotalCustomers - previousTotalCustomers) /
            previousTotalCustomers) *
            100
        )
      : 0;

    // stats for customers
    const stats = {
      currentTotalCustomers,
      previousTotalCustomers,
      percentage: growthPercentage,
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
