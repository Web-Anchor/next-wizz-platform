import { Template } from '@appTypes/index';
import { auth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { templates, users } from '@db/schema';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { buildTemplate, getTemplate } from '@server/templates';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    const { userId } = auth();
    const body = await request.json();

    // --------------------------------------------------------------------------------
    // 📌  Validate client subscription & subscription
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    const dbTemplate = await db
      .select()
      .from(templates)
      .where(
        and(eq(templates.userId, dbUser[0].id), eq(templates.id, body.id))
      );

    const uniqueId = uuidv4();
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

    const { data } = await axios.post(
      process.env.NETLIFY_FUNCTIONS + '/puppet-pdf-gen',
      {
        html,
        id: uniqueId, // dbTemplate?.[0].id,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
        },
      }
    );

    return NextResponse.json(
      {
        ...data,
        url: data?.url + `?version=${uuidv4()}`, // Browser caching bypass
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('🚨 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
