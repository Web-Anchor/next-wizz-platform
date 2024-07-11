import { auth } from '@clerk/nextjs/server';
import { genPreviewTemplate } from '@server/generate-template';
import { NextRequest, NextResponse } from 'next/server';

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
    const body = await request.json();
    console.log('📄 Generating PDF template...');

    const browser = await getBrowser();
    const page = await browser.newPage();
    const { html } = await genPreviewTemplate({ id: body.id });

    // --------------------------------------------------------------------------------
    // 📌 Set the HTML content of the page
    // page.goto with a data: URL, Puppeteer will trigger network requests to load external resources like images, scripts, and stylesheets
    // --------------------------------------------------------------------------------
    await page.goto(`data:text/html,${body.html || html}`, {
      waitUntil: 'networkidle0',
      timeout: 5000,
    });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true }); // Set the PDF format
    await browser.close();

    // --------------------------------------------------------------------------------
    // 📌 Convert the PDF buffer to base64
    // --------------------------------------------------------------------------------
    // const base64PDF = pdfBuffer.toString('base64');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
