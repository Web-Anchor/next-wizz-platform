import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  auth().protect();

  // --------------------------------------------------------------------------------
  // 📌  Get Account & params
  // --------------------------------------------------------------------------------
  const searchParams = request.nextUrl.searchParams;
  const account = searchParams?.get('account')!;
  const keyId = searchParams?.get('keyId')!;

  // --------------------------------------------------------------------------------
  // 📌  Get Account API keys
  // --------------------------------------------------------------------------------
  const keys = await db
    .select()
    .from(stripeKeys)
    .where(eq(stripeKeys.userId, account));
  let accountKey: undefined | any = keys[0];

  if (keyId !== null) {
    accountKey = keys.find((key) => key.id.toString() === keyId);
  } else {
    accountKey = keys[0];
  }

  return NextResponse.json({ accountKey });
}
