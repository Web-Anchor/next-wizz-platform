import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Cancel Stripe Subscription
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body?.id; // 🚧 This is the subscription ID
    const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
    await stripe.subscriptions.cancel(id);

    return NextResponse.json({
      message: 'Subscription cancelled successfully',
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
