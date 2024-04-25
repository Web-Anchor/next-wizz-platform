import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  auth().protect();

  // If there is no signed in user, this will return a 404 error
  const { userId } = auth();
  console.log('👤 User ', userId);
  console.log('🚧 Delay API request started');

  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('🙌 Delay API request completed, redirecting...');

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/api',
    },
  });
}
