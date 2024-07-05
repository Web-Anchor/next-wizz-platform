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
    console.log('📦 Body: ', body);

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
    let dbTemplate: any;
    if (body?.id) {
      const temRes = await db
        .select()
        .from(templates)
        .where(
          and(eq(templates.userId, dbUser[0].id), eq(templates.id, body.id))
        );
      dbTemplate = temRes;
    }
    console.log('📄 Template: ', dbTemplate);

    const uniqueId = uuidv4();
    const template = await getTemplate({ templateName: 'template-one.hbs' });
    const html = await buildTemplate({
      template,
      data: {
        // dummy data prefill
        billToName: 'John Doe',
        billToEmail: 'john.doe@email.com',
        billToPhone: '123-456-7890',
        items: [
          {
            description: 'Your Product description will appear here',
            amount: '$100',
            quantity: 2,
            units: 'hrs',
          },
          {
            description: 'Your Product description will appear here',
            amount: '$50',
            quantity: 1,
            units: 'hrs',
          },
        ],
        subtotal: '$250',
        tax: '25%',
        total: '$275',
        notice:
          'PRODUCT DESCRIPTION & PRICE BEEN SET TO DEFAULT VALUES FOR DEMO PURPOSES ONLY!',
        ...((dbTemplate?.[0] ?? {}) as Template),
      },
    });
    console.log('📄 HTML', html);

    const data = await callApiWithRetry({ html, uniqueId });

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

async function callApiWithRetry(props: { html: string; uniqueId: string }) {
  const MAX_RETRIES = 4;
  const RETRY_INTERVAL = 1000;

  let retries = 0;

  try {
    const { data } = await axios.post(
      process.env.NETLIFY_FUNCTIONS + '/puppet-pdf-gen',
      {
        html: props.html,
        id: props.uniqueId, // dbTemplate?.[0].id,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`Retrying API call (${retries}/${MAX_RETRIES})...`);
      setTimeout(callApiWithRetry, RETRY_INTERVAL);
    } else {
      console.error('Max retries reached. Unable to call API.');
      throw new Error('Max retries reached. Unable to call API.');
    }
  }
}
