import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq, and } from 'drizzle-orm';
import { templates, users } from '@db/schema';
import { buildTemplate, getTemplate } from '@server/templates';
import { Template } from '@appTypes/index';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Check if customer exist in Stripe
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    const dbTemplate = await db
      .select()
      .from(templates)
      .where(
        and(eq(templates.userId, dbUser[0].id), eq(templates.id, body.id))
      );

    const template = await getTemplate({ templateName: 'template-one.hbs' });
    const html = await buildTemplate({
      template,
      data: {
        ...((dbTemplate?.[0] ?? {}) as Template),
        // dummy data prefill
        billToName: 'John Doe',
        billToEmail: 'john.doe@email.com',
        billToPhone: '123-456-7890',
        items: [
          {
            description: 'Item 1',
            amount: 100,
            quantity: 2,
            units: 'hrs',
          },
          {
            description: 'Item 2',
            amount: 50,
            quantity: 1,
            units: 'hrs',
          },
        ],
        subtotal: '250',
        tax: '25',
        total: '275',
      },
    });

    return NextResponse.json({
      status: 200,
      template,
      html,
      dbTemplate,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
