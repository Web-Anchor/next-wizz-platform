import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { db } from '@db/index';
import { users } from '@db/schema';

export async function GET() {
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

    redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
