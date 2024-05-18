import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { users } from '@db/schema';
import { eq } from 'drizzle-orm';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(request: NextRequest) {
  try {
    auth().protect();

    const { userId } = auth();
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User record found. Redirecting to: ', dbUser);

    const { searchParams } = new URL(request.url);
    const redirect = searchParams.get('redirect') ?? '/dashboard';

    if (!dbUser?.length) {
      console.log('No user record found. Creating user in database');

      return new Response(null, {
        status: 302,
        headers: {
          Location:
            APP_URL + '/api/v1/create-user' + redirect &&
            `?redirect=${redirect}`,
        },
      });
    }

    console.log('👤 User record found. Redirecting to: ', redirect);
    return new Response(null, {
      status: 302,
      headers: {
        Location: APP_URL + redirect,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
