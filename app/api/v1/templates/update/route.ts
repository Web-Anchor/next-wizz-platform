import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { invoices, users } from '@db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Validate user & validate payment plan
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    if (!dbUser.length) {
      return NextResponse.json({ error: 'User not found' });
    }

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    console.log('👤 DB User. Validate User permissions ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Update invoice templates
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const id = body.id;
    const header = body.header;
    const memo = body.memo;
    const footer = body.footer;
    const customFields = body.customFields;

    await db
      .update(invoices)
      .set({
        header,
        memo,
        footer,
        customFields,
      })
      .where(and(eq(invoices.id, id), eq(invoices.userId, dbUser[0].id)));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
