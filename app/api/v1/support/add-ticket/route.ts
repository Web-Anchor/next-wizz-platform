import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { and, eq } from 'drizzle-orm';
import { tickets, users } from '@db/schema';

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

    // --------------------------------------------------------------------------------
    // 📌  Add support ticket
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const subject = body.subject;
    const message = body.message;

    await db.insert(tickets).values({
      id: uuidv4(),
      userId: dbUser[0].id.toString(),
      subject,
      message,
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
function uuidv4():
  | string
  | import('drizzle-orm').SQL<unknown>
  | import('drizzle-orm').Placeholder<string, any> {
  throw new Error('Function not implemented.');
}
