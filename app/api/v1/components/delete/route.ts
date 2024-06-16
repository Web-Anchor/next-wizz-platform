import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq, and } from 'drizzle-orm';
import { users, components } from '@db/schema';

export async function DELETE(request: NextRequest) {
  try {
    auth().protect();

    // --------------------------------------------------------------------------------
    // 📌  Custom components
    // --------------------------------------------------------------------------------
    const { userId } = auth();
    const body = await request.json();

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));
    console.log('👤 User: ', dbUser);

    // --------------------------------------------------------------------------------
    // 📌  Delete User component
    // --------------------------------------------------------------------------------
    await db
      .delete(components)
      .where(
        and(eq(components.userId, dbUser[0].id), eq(components.id, body.id))
      );

    return NextResponse.json({
      message: 'Component deleted!',
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
