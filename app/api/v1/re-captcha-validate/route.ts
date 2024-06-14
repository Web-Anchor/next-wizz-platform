import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Setup/Access secrets api keys
// https://www.google.com/recaptcha/about/

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token) {
      throw new Error('Token is required');
    }

    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {}, // No additional data needed
      {
        params: {
          secret: process.env.RE_CAPTCHA_SECRET_KEY!,
          response: token,
        },
      }
    );

    return NextResponse.json({
      score: data?.score,
      data,
      success: data?.success,
      error: data?.error,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
