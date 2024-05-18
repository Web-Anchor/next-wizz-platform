import 'server-only';

import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;

export async function subscription({ userId }: { userId?: string | null }) {
  console.log('👤 User Subscription validation check. ID ', userId);

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId!));
  console.log('👤 User ', userId, dbUser);
  const stripeCustomerId = dbUser[0].stripeCustomerId;

  const stripe = require('stripe')(STRIPE_RESTRICTED_KEY);
  const customer = await stripe.customers.retrieve(stripeCustomerId);
  console.log('👤 Stripe Customer ', customer);

  const activeSubs = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: 'active',
  });
  console.log('👤 Stripe Active Subscriptions ', activeSubs);

  const subscription = activeSubs?.data?.[0]; // ⚠️ default to last subscription
  const product = await stripe.products.retrieve(subscription?.plan?.product);
  const stats = {
    status: subscription?.status,
    price: subscription?.plan?.amount,
    name: product?.name,
  };

  return { subscription, ...stats, customer, product };
}
