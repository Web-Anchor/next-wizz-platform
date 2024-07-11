'use server';

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

type FetcherTypes = {
  html: string;
};

export async function pdfToBase64(
  props: FetcherTypes
): Promise<{ base64PDF?: string; error?: string }> {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Puppeteer
    // --------------------------------------------------------------------------------
    console.log('📝 Creating a new page...');
    const browser = await puppeteer.launch({
      args: process.env.CHROME_EXECUTABLE_PATH ? undefined : chromium.args, // 🚧 locally throws error
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH ||
        (await chromium.executablePath(
          '/var/task/node_modules/@sparticuz/chromium/bin'
        )),
    });
    console.log('Browser created...');
    const page = await browser.newPage();
    console.log('📝 Page created...');

    // --------------------------------------------------------------------------------
    // 📌 Set the HTML content of the page
    // page.goto with a data: URL, Puppeteer will trigger network requests to load external resources like images, scripts, and stylesheets
    // --------------------------------------------------------------------------------
    await page.goto(`data:text/html,${props.html}`, {
      waitUntil: 'networkidle0',
      timeout: 5000,
    });

    console.log('📝 Page loaded...');
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true }); // Set the PDF format
    await browser.close();

    // --------------------------------------------------------------------------------
    // 📌 Convert the PDF buffer to base64
    // --------------------------------------------------------------------------------
    const base64PDF = pdfBuffer.toString('base64');

    return { base64PDF };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
