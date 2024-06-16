import { auth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { templates } from '@db/schema';
import { generateTemplate } from '@lib/templates';
import { TEMPLATE_ONE } from '@templates/index';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    const body = await request.json();
    const id = body?.id; // User db id

    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    const dbTemplates = await db
      .select()
      .from(templates)
      .where(eq(templates.userId, id))
      .limit(10);
    const template = dbTemplates?.[0];
    console.log('📄 Templates: ', dbTemplates);

    const html = generateTemplate({
      data: {
        ...({
          invoiceNumber: 'INV-001',
          date: new Date().toISOString().split('T')[0], // 2022-11-15
          billToName: 'John Doe',
          billToAddress: '123 Main St, New York, NY 10001',
          items: [
            {
              description: 'Product A',
              amount: '100',
              quantity: 2,
              units: 50,
            },
            {
              description: 'Product B',
              amount: '50',
              quantity: 1,
              units: 50,
            },
          ],
          subtotal: '150',
          tax: '15',
          total: '165',
        } as any), // User dummy data
        ...template, // Custom Template data
      },
      template: TEMPLATE_ONE,
    });
    console.log('📄 HTML: ', html);

    const { data } = await axios.post(
      process.env.NETLIFY_FUNCTIONS + '/puppet-pdf-gen',
      {
        html,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('🚨 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
