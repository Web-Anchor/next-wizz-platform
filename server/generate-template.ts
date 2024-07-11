'use server';

import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { templates } from '@db/schema';
import { buildTemplate, getTemplate } from '@server/templates';
import { Template } from '@appTypes/index';

export async function genPreviewTemplate(props: {
  id: string; // db user id
}): Promise<{ html?: string; dbTemplates?: any; error?: string }> {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    let dbTemplates: any;
    if (props.id) {
      const res = await db
        .select()
        .from(templates)
        .where(eq(templates.id, props.id))
        .limit(1);

      dbTemplates = res;
    }
    const userTemplate = dbTemplates?.[0] ?? {};

    const TEMPLATE_ONE = await getTemplate({
      templateName: 'template-one.hbs',
    });
    const html = await buildTemplate({
      data: {
        ...userTemplate, // Custom Template data
        ...{
          invoiceNumber: `INV-${Math.floor(Math.random() * 1000)}`,
          date: new Date().toISOString().split('T')[0], // 2022-11-15
          billToName: 'John Doe',
          billToAddress: '123 Main St, New York, NY 10001',
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
        }, // 📌 Dummy data
      },
      template: TEMPLATE_ONE,
    });
    console.log('✨ Template generated successfully!');

    return { html, dbTemplates: userTemplate };
  } catch (error) {
    console.log('🚨 Error generating template:', error);

    return { error: (error as Error).message };
  }
}

export async function genUserTemplate(props: {
  id: string; // db user id
  chargeData?: Template;
}): Promise<{ html?: string; dbTemplates?: any; error?: string }> {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Retrieve customers templates
    // --------------------------------------------------------------------------------
    let dbTemplates: any;
    if (props.id) {
      const res = await db
        .select()
        .from(templates)
        .where(eq(templates.id, props.id))
        .limit(1);

      dbTemplates = res;
    }
    const userTemplate = dbTemplates?.[0] ?? {};

    const TEMPLATE_ONE = await getTemplate({
      templateName: 'template-one.hbs',
    });
    const html = await buildTemplate({
      data: {
        ...userTemplate, // Custom Template data
        ...props.chargeData, // 📌 Stripe User Charge data
      },
      template: TEMPLATE_ONE,
    });
    console.log('✨ Template generated successfully!');

    return { html, dbTemplates: userTemplate };
  } catch (error) {
    console.log('🚨 Error generating template:', error);

    return { error: (error as Error).message };
  }
}
