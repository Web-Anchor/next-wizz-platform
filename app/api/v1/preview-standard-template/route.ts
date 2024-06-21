import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { buildTemplate } from '@server/templates';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Generate PDF template preview
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const templatePath = path.join(process.cwd(), 'templates', 'template.hbs'); // path to the template file
    const template = fs.readFileSync(templatePath, 'utf-8'); // read the template file

    const html = await buildTemplate({
      data: body,
      template,
    });

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error: any) {
    console.error('🚨 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
