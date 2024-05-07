import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function GET(request: NextRequest) {
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
    // 📌  Check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get('session_id');

    const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log('👤 Stripe Session', session);

    if (session.payment_status !== 'paid') {
      console.log('🔑 Payment not completed');

      return new Response(null, {
        status: 302,
        headers: {
          Location: APP_URL + '/#pricing',
        },
      });
    }

    console.log('🙌 Payment completed successfully');
    const stripeSubId = session.subscription; // 🚧 This is the subscription ID
    const stripeCustomerId = session.customer;
    await db
      .update(users)
      .set({ stripeSubId, stripeCustomerId })
      .where(eq(users.clerkId, userId!));

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard',
      },
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
