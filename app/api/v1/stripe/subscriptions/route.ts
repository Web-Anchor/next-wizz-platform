import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { subscription } from '@lib/subscription';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    // --------------------------------------------------------------------------------
    // 📌  dn user
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    console.log('👤 Clerk User Id ', userId);

    // --------------------------------------------------------------------------------
    // 📌  Get stripe subscriptions for user
    // --------------------------------------------------------------------------------
    const subRes = await subscription({ userId });

    return NextResponse.json({ ...subRes });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
