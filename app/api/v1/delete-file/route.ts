import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    auth().protect();
    const body = await request.json();
    const url = body?.url;

    if (!url) {
      throw new Error('File URL is required');
    }
    console.log('📂 Deleting file', body);
    const { pathname } = new URL(url);

    const res = await axios.delete(
      `https://storage.bunnycdn.com/${process.env.BUNNYCDN_STORAGE_ZONE_NAME}${pathname}`,
      {
        headers: {
          'Content-Type': 'application/pdf',
          AccessKey: process.env.BUNNYCDN_STORAGE_ACCESS_KEY,
        },
      }
    );
    console.log('📂 File deleted successfully', res);

    return NextResponse.json({
      message: 'File deleted successfully!',
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
