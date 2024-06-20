import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PUT(request: NextRequest) {
  try {
    auth().protect();
    const body = await request.json();
    const { fileType, formData } = body;
    const id = body?.id || Date.now() + Math.random();

    if (!fileType) {
      throw new Error('File type is required');
    }
    console.log('📂 File upload process', body);

    const res = await axios.put(
      `https://storage.bunnycdn.com/${process.env.BUNNYCDN_STORAGE_ZONE_NAME}/${id}.${fileType}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/pdf',
          AccessKey: process.env.BUNNYCDN_STORAGE_ACCESS_KEY,
        },
      }
    );
    console.log('📂 File uploaded successfully completed', res);

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: `https://${process.env.BUNNYCDN_STORAGE_CDN_NAME}.b-cdn.net/${id}.${fileType}`,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
