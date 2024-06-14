import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { tickets } from '@db/schema';
import { TicketStatus } from '@config/index';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Add support ticket
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const subject = body.subject;
    const message = body.message;
    const email = body.email;

    await db.insert(tickets).values({
      id: uuidv4(),
      subject,
      message,
      email,
      type: 'public', // Add type to ticket type of public
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
