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
    let charges: any;
    let chargesPermissionError: boolean = false;
    let chargesError: any;

    try {
      charges = await stripe.charges.list({ limit: 1 });
    } catch (error: any) {
      chargesPermissionError = error?.type === 'StripePermissionError';
      chargesError = error;
    }

    // --------------------------------------------------------------------------------
    // 📌  Validate the key by getting customers
    // --------------------------------------------------------------------------------
    let customers: any;
    let customersPermissionError: boolean = false;
    let customersError: any;

    try {
      customers = await stripe.customers.list({ limit: 1 });
    } catch (error: any) {
      customersPermissionError = error?.type === 'StripePermissionError';
      customersError = error;
    }

    return NextResponse.json({
      charges,
      customers,
      error: chargesError?.message || customersError?.message,
      hasErrors: !!chargesError || !!customersError,
      errorType: chargesError?.type || customersError?.type,
      chargesPermissionError,
      customersPermissionError,
    });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
