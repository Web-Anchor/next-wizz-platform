import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  dn user
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId, dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Get stripe subscriptions for user
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
    const subscriptions = await stripe.subscriptions.list({
      customer: dbUser?.[0]?.stripeCustomerId,
    });
    console.log('👤 Stripe Subscriptions ', subscriptions);

    return NextResponse.json({ subscriptions });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
