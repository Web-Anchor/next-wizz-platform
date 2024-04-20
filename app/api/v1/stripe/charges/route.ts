import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';
import axios from 'axios';
import { skip } from 'node:test';
import { users } from '@db/schema/users';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Get Account & params
    // --------------------------------------------------------------------------------
    const searchParams = request.nextUrl.searchParams;
    const account = searchParams?.get('account')!;
    const keyId = searchParams?.get('keyId')!;
    const next_page = searchParams?.get('next_page')!;
    console.log('PARAMS ONE ', searchParams);

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const dbUser = await db.select().from(users).where(eq(users.id, account!));
    console.log('👤 User ', dbUser);
    // TODO restrict access if no sub expires | Use own Stripe API key

    // --------------------------------------------------------------------------------
    // 📌  Get Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(stripeKeys)
      .where(eq(stripeKeys.userId, account));
    let dbKey: undefined | any = keys[0];

    if (keyId !== null) {
      dbKey = keys.find((key) => key.id.toString() === keyId);
    } else {
      dbKey = keys[0];
    }
    const apiKey = dbKey?.restrictedAPIKey;
    console.log('🔑 key', apiKey);

    // --------------------------------------------------------------------------------
    // 📌  Get User Charges
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    console.log('👤 User ', userId, email);

    const stripe = require('stripe')(apiKey);
    // get customer information
    const customer = await stripe.customers.search({
      query: `email~"${email}"`,
    });
    const customerId = customer.data[0].id;
    const charges = await stripe.charges.search({
      limit: 2,
      page: next_page === null ? undefined : next_page,
      query: `customer:"${customerId}"`,
    });
    // find charges by customer email
    // const charges = await stripe.charges.list({ customer: 'cus_KfMq1e3J3Q3HbD' });

    console.log('🔑 charges', customer, charges);

    // const { data } = await axios.get(
    //   `${APP_URL}/api/v1/stripe/keys?account=${account}&keyId=${keyId}`
    // );
    // console.log('🔑 keys', data);

    return NextResponse.json({ charges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
