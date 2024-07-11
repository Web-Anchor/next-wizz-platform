'use server';

// import puppeteer, { PDFOptions } from 'puppeteer';
// import chromium from '@sparticuz/chromium';

// @ts-ignore
import chromium from '@sparticuz/chromium-min';
import puppeteer, { PDFOptions } from 'puppeteer-core';

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
      // args: chromium.args, // 🚧 chromium.args throwing errors
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH ||
        (await chromium.executablePath(
          '/var/task/node_modules/@sparticuz/chromium/bin'
        )),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    console.log('📄 Browser launched!');

    const page = await browser.newPage();
    console.log('📄 New page created!');
    await page.goto(`data:text/html,${props.html}`, {
      waitUntil: 'networkidle0',
    });

    const pdfBuffer = await page.pdf(
      props.options ?? {
        printBackground: true,
        format: 'A4',
      }
    );

    const base64PDF = pdfBuffer.toString('base64');
    await browser.close();
    console.log('📄 PDF Generated!', pdfBuffer?.length);

    return { base64PDF };
  } catch (error) {
    console.error('📄 Error generating PDF:', error);
    return { error: (error as Error).message };
  }
}
