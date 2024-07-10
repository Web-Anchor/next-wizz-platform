'use server';

import puppeteer from 'puppeteer';

export async function genPdfBuffer(props: {
  html: string;
}): Promise<{ base64PDF?: string; error?: string }> {
  try {
    console.log('📄 Generating PDF...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(props.html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    const base64PDF = pdfBuffer.toString('base64');
    console.log('📄 PDF Generated!');

    await browser.close();

    return { base64PDF };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
