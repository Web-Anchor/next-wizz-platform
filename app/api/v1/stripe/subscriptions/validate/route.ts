import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema/users';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

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
    // 📌  Check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 db User ', dbUser);

    let stripeCustomerId: string | null = dbUser[0]?.stripeCustomerId;
    const customer = await stripe.customers.search({
      query: `email:"${dbUser[0]?.emailAddress}"`,
    });
    const stripeCustomer = customer?.data?.[0];
    console.log('👤 Stripe Customer', stripeCustomer);

    if (!!stripeCustomer) {
      console.log('👤 No Stripe Customer been found!');

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
    // 📌  Retrieve product list from Stripe
    // --------------------------------------------------------------------------------
    const products = await stripe.products.list({
      limit: 3,
    });
    console.log('👤 Stripe Products ', products);

    // --------------------------------------------------------------------------------
    // 📌  Create Stripe subscription
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body?.id; // 🚧 This is the product ID
    const product = products?.data?.find((product: any) => product.id === id);

    const session = await stripe.checkout.sessions.create({
      success_url: `${APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: product?.default_price, // This should be a recurring price ID, not a one-time price ID
          quantity: 1,
        },
      ],
    });
    const sessionUrl = session?.url;

    if (sessionUrl) {
      // --------------------------------------------------------------------------------
      // 📌  Redirect user to checkout page
      // --------------------------------------------------------------------------------
      console.log('🔑 Redirecting to checkout page', sessionUrl);

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
    return NextResponse.json({ error: error?.message });
  }
}
