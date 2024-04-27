import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  Validate API key
    // --------------------------------------------------------------------------------
    const body = await request.json();
    const key = body.key;
    const { userId } = auth();

    const stripe = require('stripe')(key);

    // --------------------------------------------------------------------------------
    // 📌  Validate API key by getting user charges
    // --------------------------------------------------------------------------------
    const charges = await stripe.charges.list({ limit: 1 });
    // console.log('🔑 charges', charges);
    console.log('🔑 charges', charges);

    // if (charges?.error) {
    //   return new Response(JSON.stringify({ error: charges?.error }), {
    //     status: 401,
    //   });
    // }

    // const { data } = await axios.get(
    //   `${APP_URL}/api/v1/stripe/keys?account=${account}&keyId=${keyId}`
    // );
    // console.log('🔑 keys', data);

    return NextResponse.json({ charges });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json({ error: error?.message });
  }
}
