import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, subject, html } = await request.json();
    if (!email) {
      throw new Error('Email is required');
    }

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: html ?? `<p>Email to: <strong>${email}</strong>!</p>`,
    });
    console.log('📧 Email Sent to:', email, subject);

    return NextResponse.json({
      message: 'Email sent!',
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
