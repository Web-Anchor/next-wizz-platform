import { NextRequest, NextResponse } from 'next/server';
import { getTemplate } from '@server/templates';

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Get hbs template
    // --------------------------------------------------------------------------------
    const body = await request.json();

    const template = await getTemplate({
      templateName: body?.template ?? 'template-not-found.hbs',
    });

    return NextResponse.json({
      status: 200,
      template,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}

async function handleBody(req: NextRequest) {
  if (req.method === 'POST' && req.body) {
    return await req.json();
  }
  return {};
}
