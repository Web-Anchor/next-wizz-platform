import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Retrieve product list from Stripe
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
    const products = await stripe.products.list({
      limit: 3,
    });
    console.log('👤 Stripe Products ', products);

    // --------------------------------------------------------------------------------
    // 📌  dn user
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId);

    // --------------------------------------------------------------------------------
    // 📌  Create Stripe subscription
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body?.id; // 🚧 This is the product ID
    const product = products?.data?.find((product: any) => product.id === id);
    const stripeCustomerId = validateString(dbUser?.[0]?.stripeCustomerId);

    const session = await stripe.checkout.sessions.create({
      success_url: `${APP_URL}/api/v1/stripe/subscriptions/add?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/api/v1/stripe/subscriptions/add?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: product?.default_price, // This should be a recurring price ID, not a one-time price ID
          quantity: 1,
        },
      ],
      customer_email: stripeCustomerId ? undefined : dbUser?.[0]?.emailAddress, // If customer is found in Stripe, no need to provide email
      customer: stripeCustomerId,
      // billing_address_collection: 'required',
    });
    const sessionUrl = session?.url;

    if (sessionUrl) {
      // --------------------------------------------------------------------------------
      // 📌  Redirect user to checkout page
      // --------------------------------------------------------------------------------
      console.log('🔑 Redirecting to checkout page', sessionUrl);

      // TODO: SSR redirect implementation check against Stripe
      // return new Response(null, {
      //   status: 302,
      //   headers: {
      //     Location: sessionUrl,
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // });
      return NextResponse.json({ url: sessionUrl });
    }

    return NextResponse.json({
      error: 'Session URL is missing',
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}

function validateString(value: string | undefined | null) {
  return typeof value === 'string' && value.length > 0 && value
    ? value
    : undefined;
}
