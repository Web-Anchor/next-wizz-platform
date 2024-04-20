import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@db/index';
import { users } from '@db/schema/users';
import { eq } from 'drizzle-orm';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET() {
  try {
    auth().protect();

    const { userId } = auth();
    const dbUser = await db.select().from(users).where(eq(users.id, userId!));
    console.log('👤 User ', userId, dbUser);

    if (!dbUser?.length) {
      console.log('No user record found. Creating user in database');

      return new Response(null, {
        status: 302,
        headers: {
          Location: APP_URL + '/api/v1/stripe/create',
        },
      });
    }

    console.log('User record found. Redirecting to dashboard');
    return new Response(null, {
      status: 302,
      headers: {
        Location: APP_URL + '/dashboard',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
