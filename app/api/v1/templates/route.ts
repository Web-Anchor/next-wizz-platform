import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { invoices, users } from '@db/schema';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    const templates = await db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, dbUser[0].id))
      .limit(10);

    console.log('🧾 Templates: ', templates);

    return NextResponse.json({
      status: 200,
      templates,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
