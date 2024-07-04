'use server';

import { auth } from '@clerk/nextjs/server';
import { subscription, validateAdvancedSubMiddleware } from '@lib/subscription';
import { notFound } from 'next/navigation';

export async function advancedSubRouteGuard() {
  try {
    const { userId } = auth();
    const subRes = await subscription({ userId });
    validateAdvancedSubMiddleware({ name: subRes?.product?.name });
    console.log('👤 _User: ', userId, subRes);
  } catch (error) {
    return notFound();
  }
}
