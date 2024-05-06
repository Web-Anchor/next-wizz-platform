import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------------------------------------
    // 📌  User auth checks
    // --------------------------------------------------------------------------------
    const { userId } = auth();

    if (!userId) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/sign-in' }, // ⚠️ Redirect to sign-in if no user is logged in
      });
    }

    // --------------------------------------------------------------------------------
    // 📌  check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 db User ', dbUser);

    let stripeCustomerId: string | null = dbUser[0]?.stripeCustomerId;
    const customer = await stripe.customers.search({
      email: dbUser[0]?.emailAddress,
    });
    console.log('👤 Stripe Customer ', customer);

    if (!!customer.data.length) {
      const customer = await stripe.customers.create({
        name: `${dbUser[0]?.firstName} ${dbUser[0]?.lastName}`,
        email: dbUser[0]?.emailAddress,
        metadata: {
          clerkId: userId,
        },
      });
      stripeCustomerId = customer.id;
    }

    console.log('👤 Stripe Customer ID ', stripeCustomerId);

    // --------------------------------------------------------------------------------
    // 📌  Create Stripe subscription
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body?.id;

    // return NextResponse.json({ charges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
