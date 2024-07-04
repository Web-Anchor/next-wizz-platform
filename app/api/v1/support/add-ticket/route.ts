import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { tickets, users } from '@db/schema';
import { TicketStatus } from '@config/index';
import { v4 as uuidv4 } from 'uuid';

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
    // 📌  Add support ticket
    // --------------------------------------------------------------------------------
    const body = await request.json();

    await db.insert(tickets).values({
      id: uuidv4(),
      userId: dbUser[0].id.toString(),
      subject: body.subject,
      message: body.message,
      type: 'platform',
      status: TicketStatus?.Open,
    });

    return NextResponse.json({
      status: 200,
      data: 'Ticket added successfully',
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
