import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { keys as strKeys, users } from '@db/schema';
import { eq } from 'drizzle-orm';
import { FETCH_LIMIT } from '@config/index';

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

    // --------------------------------------------------------------------------------
    // 📌  User validation
    // --------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------
    // 📌  Get Account API keys
    // --------------------------------------------------------------------------------
    const keys = await db
      .select()
      .from(strKeys)
      .where(eq(strKeys.userId, dbUser[0].id));
    console.log('🔑 keys', keys);

    // --------------------------------------------------------------------------------
    // 📌  Get User Customer
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const apiKey = keys?.[0]?.restrictedAPIKey;
    const stripe = require('stripe')(apiKey);

    const customers = await stripe?.customers?.list({
      limit: FETCH_LIMIT,
      starting_after: body?.starting_after ?? undefined,
      ending_before: body?.ending_before ?? undefined,
    });

    let has_previous = false;
    let has_more = customers?.has_more;
    if (!!body.ending_before) {
      has_previous = customers?.has_more;
      has_more = customers?.data?.length === FETCH_LIMIT;
    }
    if (body.starting_after) {
      has_previous = true;
    }

    customers.has_previous = has_previous; // add pagination flag
    customers.has_more = has_more; // add pagination flag

    return NextResponse.json({ customers });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
