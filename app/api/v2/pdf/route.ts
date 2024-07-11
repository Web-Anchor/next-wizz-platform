import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    auth().protect();
    const { userId } = auth();
    const body = await request.json();
    const html = body.html;
    console.log('📦 Body: ', body);

    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return NextResponse.json({
      pdfBuffer,
    });
  } catch (error: any) {
    console.error('🚨 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
