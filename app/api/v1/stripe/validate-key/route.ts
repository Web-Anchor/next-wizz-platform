import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Validate API key
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const key = body.key;

    const stripe = require('stripe')(key);

    // --------------------------------------------------------------------------------
    // 📌  Validate API key by getting user charges
    // --------------------------------------------------------------------------------
    const charges = await stripe.charges.list({ limit: 1 });

    return NextResponse.json({ charges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
