import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq } from 'drizzle-orm';
import { FETCH_LIMIT } from '@config/index';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  User auth
    // --------------------------------------------------------------------------------
    const { userId } = auth();

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User ', userId);
    // TODO restrict access if no sub expires | Use own Stripe API key

    // --------------------------------------------------------------------------------
    // 📌  Get Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id.toString()));
    console.log('🔑 keys', keys);

    // --------------------------------------------------------------------------------
    // 📌  Get User Customer
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const keyId = body?.keyId;
    const key = keys.find((k) => k.id === keyId); // 🔑 find key by id

    const apiKey = key ?? keys?.[0]?.restrictedAPIKey; // 🔑 use first key if no keyId
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key found' });
    }
    const stripe = require('stripe')(apiKey);

    const charges = await stripe.charges.list({
      limit: FETCH_LIMIT,
      starting_after: body?.starting_after ?? undefined,
      ending_before: body?.ending_before ?? undefined,
      expand: ['data.customer'],
    });
    console.log('🔑 charges', charges);

    let has_previous = false;
    let has_more = charges?.has_more;
    if (!!body.ending_before) {
      has_previous = charges?.has_more;
      has_more = charges?.data?.length === FETCH_LIMIT;
    }
    if (body.starting_after) {
      has_previous = true;
    }

    charges.has_previous = has_previous; // add pagination flag
    charges.has_more = has_more; // add pagination flag

    return NextResponse.json({ charges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
