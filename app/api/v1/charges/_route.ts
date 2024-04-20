import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
});

type Params = {
  page: string;
  account: string; // Stripe connected account id
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  auth().protect();

  // get page from params
  const { page } = params;

  // If there is no signed in user, this will return a 404 error
  const { userId } = auth();
  const user = await currentUser();
  console.log('👤 User ', userId, user);

  // get charges from stripe api
  const charges = await stripe.charges.list({ limit: 10 });

  // get connected account from stripe api charges & paginate
  const connectedAccount = await stripe.accounts.retrieve(params.account);

  // get connected account from stripe customer charges (customer is user.email)
  const customer = await stripe.customers.retrieve(
    user?.emailAddresses?.[0]?.emailAddress!
  );

  // get connected account from stripe customer charges (customer is user.email)
  const customerCharges = await stripe.charges.list({ customer: customer.id });

  return NextResponse.json({
    charges,
    connectedAccount,
    customerCharges,
    customer,
  });
}
