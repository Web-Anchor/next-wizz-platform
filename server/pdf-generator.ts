'use server';

import puppeteer, { PDFOptions } from 'puppeteer';
import chromium from '@sparticuz/chromium';

export async function genPdfBuffer(props: {
  html: string;
  options?: PDFOptions;
}): Promise<{ base64PDF?: string; error?: string }> {
  try {
    console.log('📄 Generating PDF...');
    // const executablePath =
    //   process.env.CHROME_EXECUTABLE_PATH ||
    //   (await chromium.executablePath(
    //     '/var/task/node_modules/@sparticuz/chromium/bin'
    //   ));

    // const browser = await puppeteer.launch({
    //   args: chromium.args,
    //   // executablePath,
    //   headless: true,
    // });
    // const page = await browser.newPage();
    // await page.setContent(props.html, { waitUntil: 'networkidle0' });
    // const pdfBuffer = await page.pdf({ format: 'A4' });
    // const base64PDF = pdfBuffer.toString('base64');
    // console.log('📄 PDF Generated!');

    // await browser.close();

    const browser = await puppeteer.launch({
      args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage'],
      // executablePath: await chromium.executablePath(),
      executablePath: puppeteer.executablePath(), // Use Puppeteer's default executable path
    });
    const page = await browser.newPage();
    await page.setContent(props.html);
    const pdfBuffer = await page.pdf(
      props.options ?? {
        printBackground: true,
        format: 'A4',
      }
    );
    const base64PDF = pdfBuffer.toString('base64');
    await browser.close();

    return { base64PDF };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
