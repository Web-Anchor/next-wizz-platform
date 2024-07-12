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
    if (!body.id) {
      throw new Error('Request body must contain an id.');
    }

    const { pdfBuffer } = await callApiWithRetry({
      html: body.html,
      id: body.id,
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse((error as Error).message, { status: 500 });
  }
}

async function callApiWithRetry(props: { html: string; id: string }) {
  const MAX_RETRIES = 4;
  const RETRY_INTERVAL = 2000; // delay between retries in ms
  let retries = 0;

  async function attempt(): Promise<{ pdfBuffer?: Buffer }> {
    try {
      console.log('📄 Generating PDF template...');
      const browser = await getBrowser();
      if (!browser) {
        throw new Error('Failed to launch browser!');
      }

      const page = await browser.newPage();
      const { html, error } = await genPreviewTemplate({ id: props.id });
      if (error) {
        throw new Error(`Template generation error: ${error}`);
      }

      const pageContent = props.html || html;
      if (!pageContent) {
        throw new Error('No HTML content available to generate PDF.');
      }

      // Ensure HTML is properly encoded to prevent XSS attacks
      const encodedHTML = encodeURIComponent(pageContent);

      await page.goto(`data:text/html,${encodedHTML}`, {
        waitUntil: 'networkidle0',
        timeout: 10000, // Increased timeout for more complex pages
      });

      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      await browser.close();

      return { pdfBuffer };
    } catch (error) {
      if (retries < MAX_RETRIES) {
        retries++;
        console.log(`Retrying API call (${retries}/${MAX_RETRIES})...`);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            attempt().then(resolve).catch(reject);
          }, RETRY_INTERVAL);
        });
      } else {
        console.error('Max retries reached. Unable to call API.');
        throw new Error('Max retries reached. Unable to call API.');
      }
    }
  }

  return attempt();
}
