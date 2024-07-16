import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';
import { subscription, validateActiveSubMiddleware } from '@lib/subscription';
import { plans } from '@config/index';
import {
  countIncrement,
  isTodayFirstOfMonth,
} from '@app/api/v2/templates/download/helpers';

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

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);
    console.log('PLANS_RES: ', subRes);

    // --------------------------------------------------------------------------------
    // 📌  Validate emailsSendCount against config
    // --------------------------------------------------------------------------------
    const sendCount = parseInt(dbUser[0].emailsSendCount ?? '0');
    const cap = plans[subRes?.product?.name!]?.emailCap!;
    console.log('📧 Emails Sent Count: ', sendCount, cap);

    if (sendCount >= cap) {
      return NextResponse.json({ error: 'Emails quota limit exceeded!' });
    }

    // --------------------------------------------------------------------------------
    // 📌  Update user email sent count & date sent
    // --------------------------------------------------------------------------------
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
    const { data, error } = await resend.emails.send({
      from: 'invoicio.io <info@invoicio.io>',
      to: [email],
      subject: subject,
      // react: EmailTemplate({ firstName: 'John' }),
      html: html ?? `<p>Email to: <strong>${email}</strong>!</p>`,
    });
    console.log('🚨 __error ', data, error);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    console.log('📧 Email Sent to:', email, subject);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
