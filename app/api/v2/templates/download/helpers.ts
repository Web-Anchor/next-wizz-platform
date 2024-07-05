import 'server-only';

import { templates } from '@db/schema';
import { eq, and } from 'drizzle-orm';
import { db } from '@db/index';
import { buildTemplate, getTemplate } from '@server/templates';
import { Template } from '@appTypes/index';
import puppeteer from 'puppeteer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function buildHTMLTemplate(props: {
  userId: string;
  templateId: string;
}) {
  // --------------------------------------------------------------------------------
  // 📌  Retrieve customers templates
  // --------------------------------------------------------------------------------
  let dbTemplate: any;
  if (props.userId && props.templateId) {
    const temRes = await db
      .select()
      .from(templates)
      .where(
        and(
          eq(templates.userId, props.userId),
          eq(templates.id, props.templateId)
        )
      );
    dbTemplate = temRes;
  }
  console.log('📄 dbTemplate: ', dbTemplate);

  const template = await getTemplate({ templateName: 'template-one.hbs' });
  const html = await buildTemplate({
    template,
    data: {
      // 🏄‍♂️ dummy data prefill
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

  return { html, dbTemplate, template };
}

export async function generatePdfBuffer(props: { html: string }) {
  const fallback = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Fall Back Template</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="mx-auto h-full">
            <h1 class="text-4xl font-bold text-gray-800">PDF Generator</h1>
            <p class="text-gray-600">Please provide a template to generate a PDF.</p>
          </div>

          <footer class="fixed bottom-0 w-full bg-gray-100 p-4">
            <p class="text-center text-gray-600">© ${new Date().getFullYear()} PDF Generator</p>
          </footer>
        </body>
      </html>
    `;
  const html = props?.html || fallback;
  console.log('📄 Generating PDF template buffer');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true }); // Set the PDF format
  await browser.close(); // Close the browser
  console.log('📄 PDF buffer successfully!');

  return pdfBuffer;
}

export async function bufferUpload(props: {
  buffer: Buffer;
  fileType: string;
}): Promise<string> {
  const formData = new FormData();
  const uniqueId = uuidv4();
  const fileType = props?.fileType || 'pdf';

  const blob = new Blob([props.buffer], { type: 'application/pdf' });
  formData.append('file', blob, 'file.pdf');

  await axios.put(
    `https://storage.bunnycdn.com/${process.env.BUNNYCDN_STORAGE_ZONE_NAME}/${uniqueId}.${fileType}`,
    formData,
    {
      headers: {
        'Content-Type': 'application/pdf',
        AccessKey: process.env.BUNNYCDN_STORAGE_ACCESS_KEY,
      },
    }
  );
  const url = `https://${process.env.BUNNYCDN_STORAGE_CDN_NAME}.b-cdn.net/${uniqueId}.${fileType}`;
  console.log('📦 URL generated successfully!', url);

  return url;
}
