import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { stripeKeys } from '@db/schema/stripeKeys';

type Params = {
  page: string;
  account: string; // Stripe connected account id
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  auth().protect();

  const { page, account } = params;
  const keys = await db
    .select()
    .from(stripeKeys)
    .where(eq(stripeKeys?.userId, account));

  const { userId } = auth();
  const user = await currentUser();
  console.log('👤 User ', userId, user);

  return NextResponse.json({
    keys,
    user,
  });
}
