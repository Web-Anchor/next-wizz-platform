import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { invoices, users } from '@db/schema';
import { v4 as uuidv4 } from 'uuid';
import { subscription } from '@lib/subscription';
import { plans } from '@config/index';
import { Plan } from '../../../../../types';

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
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const { name: planName, status } = await subscription({ userId });

    if (status !== 'active') {
      console.log('👤 Subscription not active');
      return NextResponse.json({
        error: 'Subscription not active. Please subscribe!',
      });
    }
    const config = plans[planName] as Plan;
    if (config.name === 'freelancer') {
      return NextResponse.json({
        error: 'Please upgrade your plan to add invoice templates',
      });
    }

    // --------------------------------------------------------------------------------
    // 📌  Add invoice template
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const header = body.header;
    const memo = body.memo;
    const footer = body.footer;
    const customFields = body.customFields;

    await db.insert(invoices).values({
      id: uuidv4(),
      userId: dbUser[0].id.toString(),
      header,
      memo,
      footer,
      customFields,
    });

    return NextResponse.json({
      status: 200,
      data: 'Ticket added successfully',
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
