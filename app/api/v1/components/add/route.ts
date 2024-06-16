import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq, and } from 'drizzle-orm';
import { users, components } from '@db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
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
    // 📌  User custom component
    // --------------------------------------------------------------------------------
    console.log('👤 BODY: ', body);
    let component = await db
      .select()
      .from(components)
      .where(
        and(eq(components.userId, dbUser[0].id), eq(components.type, body.type))
      );
    console.log('👤 Component: ', component);

    // --------------------------------------------------------------------------------
    // 📌  Create component if record does not exist
    // --------------------------------------------------------------------------------
    if (!component.length) {
      console.log('👤 Component record does not exist', body);

      const newComponent = await db.insert(components).values({
        id: uuidv4(),
        userId: dbUser[0].id.toString(),
        ...body,
      });
      console.log('👤 Component record created successfully 🙌');
      console.log('👤 New component: ', newComponent);
    }

    // --------------------------------------------------------------------------------
    // 📌  Update component if record does not exist
    // --------------------------------------------------------------------------------
    if (component.length) {
      await db
        .update(components)
        .set({
          ...body,
        })
        .where(eq(components.id, component[0].id));
      console.log('👤 Component record updated successfully 🙌');
    }
    const id = component?.[0]?.id;

    return NextResponse.json({
      message: id
        ? 'Component updated successfully! 🙌'
        : 'Component added successfully! 🙌',
      id,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
