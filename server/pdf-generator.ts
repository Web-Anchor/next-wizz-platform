'use server';

// @ts-ignore
import chromium from '@sparticuz/chromium-min';
// import chromium from '@sparticuz/chromium';
import puppeteer, { PDFOptions } from 'puppeteer-core';
// @ts-ignore
import PCR from 'puppeteer-chromium-resolver';

export async function genPdfBuffer(props: {
  html: string;
  options?: PDFOptions;
}): Promise<{ base64PDF?: string; error?: string }> {
  try {
    console.log('📄 Generating PDF...');
    // const prodPath = await chromium
    //   .executablePath
    //   // '/var/task/node_modules/@sparticuz/chromium/bin' // Chromium version
    //   // '/opt/chromium' // Chromium-min version
    //   ();
    // console.log('📄 prodPath', prodPath);
    // (await chromium.executablePath(
    //   // '/var/task/node_modules/@sparticuz/chromium/bin' // 🚧  Chromium version
    //   `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar` // 🚧 Chromium-min version
    // ))

    const options = {
      downloadPath: `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`,
    };
    const stats = await PCR(options);
    console.log('📄 stats', stats);

    const browser = await puppeteer.launch({
      args: process.env.CHROME_EXECUTABLE_PATH ? undefined : chromium.args, // 🚧 chromium.args throwing errors
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH || // 🚧 local dev executable path
        (await chromium.executablePath(stats.executablePath)) ||
        stats.executablePath, // 🚧 prod executable path
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    console.log('📄 Browser launched!');

    const page = await browser.newPage();
    console.log('📄 New page created!');
    await page.goto(`data:text/html,${props.html}`, {
      waitUntil: 'networkidle0',
      timeout: 5000,
    });

    const pdfBuffer = await page.pdf(
      props.options ?? {
        printBackground: true,
        format: 'A4',
      }
    );

    const base64PDF = pdfBuffer.toString('base64');
    await browser?.close();
    console.log('📄 PDF Generated!', pdfBuffer?.length);

    return { base64PDF };
  } catch (error) {
    console.error('📄 Error generating PDF:', error);
    return { error: (error as Error).message };
  }
}
