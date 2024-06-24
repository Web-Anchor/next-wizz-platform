import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';
import { isToday, getDate } from 'date-fns';
import { subscription, validateActiveSubMiddleware } from '@lib/subscription';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    auth().protect();
    const { email, subject, html } = await request.json();
    if (!email) {
      throw new Error('Email is required');
    }

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });

    // --------------------------------------------------------------------------------
    // 📌  Update user email sent count & date sent
    // --------------------------------------------------------------------------------
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);

    const today = new Date().toISOString();
    let emailsSendCount = countIncrement(dbUser[0].emailsSendCount);
    if (today !== dbUser[0].lastEmailSendDate && isTodayFirstOfMonth(today)) {
      emailsSendCount = '1';
    }

    await db.update(users).set({
      emailsSendCount,
      lastEmailSendDate: today,
    });

    // --------------------------------------------------------------------------------
    // 📌  Sent email to the client
    // --------------------------------------------------------------------------------
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

function countIncrement(count: string | null): string | null {
  const computedCount = count ? parseInt(count) + 1 : 1;
  return computedCount.toString();
}

function isTodayFirstOfMonth(
  date: string | null = new Date().toISOString()
): boolean {
  return isToday(date!) && getDate(date!) === 1;
}
