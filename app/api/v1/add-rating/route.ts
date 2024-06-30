import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { users, ratings } from '@db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    auth().protect();

    const { userId } = auth();
    const user = await currentUser();
    const body = await request.json();
    const comments = body?.comments;
    const rating = body?.rating;
    console.log('👤 Creating User record. Clerk data: ', userId, user);

    await db
      .insert(ratings)
      .values({
        id: uuidv4(),
        clerkId: userId!,
        firstName: user?.firstName,
        lastName: user?.lastName,
        imageUrl: user?.imageUrl,
        platform: 'platform',
        rating,
        comments,
      })
      .returning({ id: users.id });
    console.log('👤 User rating created successfully 🙌');

    return NextResponse.json({ message: 'Rating created successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
