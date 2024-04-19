import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { users } from '@db/schema';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    auth().protect();

    const { userId } = auth();
    const user = await currentUser();

    await db
      .insert(users)
      .values({
        id: userId!,
        emailAddress: user?.emailAddresses?.[0]?.emailAddress!,
        firstName: user?.firstName,
        lastName: user?.lastName,
      })
      .returning({ id: users.id });

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
