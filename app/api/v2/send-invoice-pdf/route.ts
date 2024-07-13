import { auth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';
import { subscription, validateActiveSubMiddleware } from '@lib/subscription';
import { genUserTemplate } from '@server/generate-template';
import { email } from '@server/resend-email';
import { NextRequest, NextResponse } from 'next/server';
import { plans } from '@config/index';
import {
  countIncrement,
  isTodayFirstOfMonth,
} from '@app/api/v1/send-email/route';

export const dynamic = 'force-dynamic'; // force dynamic request
// --------------------------------------------------------------------------------
// 📌 https://github.com/gruckion/puppeteer-running-in-vercel/tree/main
// --------------------------------------------------------------------------------

const CHROMIUM_PATH =
  'https://vomrghiulbmrfvmhlflk.supabase.co/storage/v1/object/public/chromium-pack/chromium-v123.0.0-pack.tar';
// https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar

async function getBrowser() {
  if (!process.env.CHROME_EXECUTABLE_PATH) {
    const chromium = await import('@sparticuz/chromium-min').then(
      (mod) => mod.default
    );

    const puppeteerCore = await import('puppeteer-core').then(
      (mod) => mod.default
    );

    const executablePath = await chromium.executablePath(CHROMIUM_PATH);

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: true,
    });
    return browser;
  } else {
    const puppeteer = await import('puppeteer').then((mod) => mod.default);

    const browser = await puppeteer.launch();
    return browser;
  }
}

export async function POST(request: NextRequest) {
  try {
    auth().protect();

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User Plan: ', subRes);

    // --------------------------------------------------------------------------------
    // 📌  Validate invoiceSendCount against config
    // --------------------------------------------------------------------------------
    const sendCount = parseInt(dbUser[0].invoiceSendCount ?? '0');
    const cap = plans[subRes?.product?.name!]?.invoiceEmailCap!;
    console.log('📧 Emails Sent Count: ', sendCount, cap);

    if (sendCount >= cap) {
      return NextResponse.json({ error: 'Send Invoice quota limit exceeded!' });
    }

    // --------------------------------------------------------------------------------
    // 📌  Update user email sent count & date sent
    // --------------------------------------------------------------------------------
    const today = new Date().toISOString();
    let invoiceSendCount = countIncrement(dbUser[0].invoiceSendCount);
    if (today !== dbUser[0].lastEmailSendDate && isTodayFirstOfMonth(today)) {
      invoiceSendCount = '1';
    }

    await db.update(users).set({
      invoiceSendCount,
      lastInvoiceSendDate: today,
    });

    const body = await request.json();
    console.log('📄 Sending PDF to the client...');

    const browser = await getBrowser();
    const page = await browser.newPage();
    const { html } = await genUserTemplate({
      id: body.id,
      chargeData: body.chargeData,
    });

    // --------------------------------------------------------------------------------
    // 📌 Set the HTML content of the page
    // page.goto with a data: URL, Puppeteer will trigger network requests to load external resources like images, scripts, and stylesheets
    // --------------------------------------------------------------------------------
    await page.goto(`data:text/html,${html}`, {
      waitUntil: 'networkidle0',
      timeout: 5000,
    });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true }); // Set the PDF format
    await browser.close();

    // --------------------------------------------------------------------------------
    // 📌 Sending PDF Documents
    // --------------------------------------------------------------------------------
    const data = await email({
      attachments: [
        { filename: body.fileName || 'invoice.pdf', content: pdfBuffer },
      ],
      to: body.to || [body.email],
      subject: body.subject,
      html: body.html,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
