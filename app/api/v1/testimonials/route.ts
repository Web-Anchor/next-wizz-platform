import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/index';
import { eq, or, and, desc, sql } from 'drizzle-orm';
import { ratings } from '@db/schema';

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Validate user & validate payment plan
    // --------------------------------------------------------------------------------
    const testimonials = await db
      .select()
      .from(ratings)
      .where(
        and(
          or(eq(ratings.rating, '5.0'), eq(ratings.rating, '4.0')),
          eq(ratings.platform, 'platform'),
          sql`ratings.id IN (SELECT id FROM ratings ORDER BY created_at DESC LIMIT 1)`
        )
      )
      .orderBy(desc(ratings.createdAt))
      .limit(10);
    console.log('👤 Fetching testimonials: ', testimonials);

    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    console.error('🔑 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}
