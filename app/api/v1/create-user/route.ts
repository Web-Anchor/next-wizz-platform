import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { users } from '@db/schema/users';
import { v4 as uuidv4 } from 'uuid';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    auth().protect();

    const { userId } = auth();
    const user = await currentUser();

    const { searchParams } = new URL(request.url);
    const redirect = searchParams.get('redirect') ?? '/dashboard';

    await db
      .insert(users)
      .values({
        id: uuidv4(),
        clerkId: userId!,
        emailAddress: user?.emailAddresses?.[0]?.emailAddress!,
        firstName: user?.firstName,
        lastName: user?.lastName,
      })
      .returning({ id: users.id });
    console.log('👤 User record created. Redirecting to: ', redirect);

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
