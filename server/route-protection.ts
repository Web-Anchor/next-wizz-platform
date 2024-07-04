'use server';

import { auth } from '@clerk/nextjs/server';
import {
  subscription,
  validateActiveSubMiddleware,
  validateAdvancedSubMiddleware,
  validateBasicSubMiddleware,
} from '@lib/subscription';
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

export async function basicSubRouteGuard() {
  try {
    const { userId } = auth();
    const subRes = await subscription({ userId });
    validateBasicSubMiddleware({ name: subRes?.product?.name });
    console.log('👤 _User: ', userId, subRes);
  } catch (error) {
    return notFound();
  }
}

export async function subRouteGuard() {
  try {
    const { userId } = auth();
    const subRes = await subscription({ userId });
    validateActiveSubMiddleware({ status: subRes?.subscription?.status });
    console.log('👤 _User: ', userId, subRes);
  } catch (error) {
    return notFound();
  }
}
