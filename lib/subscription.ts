import 'server-only';

import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';
import { StripeSubscription, Customer, StripeProduct, Plan } from '../types';
import { plans } from '@config/index';

const STRIPE_RESTRICTED_KEY = process.env.STRIPE_RESTRICTED_KEY;

type Response = {
  error?: string;
  status: 200 | 401 | 500;
  subscription?: StripeSubscription;
  customer?: Customer;
  product?: StripeProduct;
};

export async function subscription({
  userId,
}: {
  userId?: string | null;
}): Promise<Response> {
  console.log('👤 User Subscription validation check. ID ', userId);

  try {
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId, dbUser);
    const stripeCustomerId = dbUser[0].stripeCustomerId;

    if (!stripeCustomerId) {
      console.log('👤 Stripe Customer Id not found');
      return {
        error: 'Stripe Customer Id not found',
        status: 401,
      };
    }

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

    return { subscription, customer, product, status: 200 };
  } catch (err: any) {
    console.error('🔑 error', err);
    return { error: err?.message, status: 500 };
  }
}

export function isSubActive(subscription: StripeSubscription): boolean {
  return subscription.status === 'active';
}

export function isSubCancelled(subscription: StripeSubscription): boolean {
  return subscription.status === 'canceled';
}

export function validateActiveSubMiddleware(props: {
  status?: string;
  message?: string;
}): void {
  if (props?.status !== 'active') {
    throw new Error(
      props?.message ?? 'Subscription not active. Please subscribe!'
    );
  }
}

export function validateBasicSubMiddleware(props: {
  name?: string;
  message?: string;
}): void {
  const config = props.name ? (plans[props.name] as Plan) : undefined;

  if (!config?.basic) {
    throw new Error(
      props?.message ?? 'Please upgrade to a basic plan to access this feature'
    );
  }
}

export function validateAdvancedSubMiddleware(props: {
  name?: string;
  message?: string;
}): void {
  const config = props.name ? (plans[props.name] as Plan) : undefined;

  if (!config?.advanced) {
    throw new Error(
      props?.message ??
        'Please upgrade to an advanced plan to access this feature'
    );
  }
}

export function validateProSubMiddleware(props: {
  name?: string;
  message?: string;
}): void {
  const config = props.name ? (plans[props.name] as Plan) : undefined;

  if (!config?.pro) {
    throw new Error(
      props?.message ?? 'Please upgrade to a pro plan to access this feature'
    );
  }
}
