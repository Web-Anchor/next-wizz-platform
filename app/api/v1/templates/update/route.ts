import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { templates, users } from '@db/schema';
import { and, eq } from 'drizzle-orm';
import {
  subscription,
  validateActiveSubMiddleware,
  validateAdvancedSubMiddleware,
} from '@lib/subscription';

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
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });
    validateAdvancedSubMiddleware({ name: subRes?.product?.name });

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
      .update(templates)
      .set({
        header,
        memo,
        footer,
        customFields,
      })
      .where(and(eq(templates.id, id), eq(templates.userId, dbUser[0].id)));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
