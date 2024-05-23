import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  auth().protect();

  // If there is no signed in user, this will return a 404 error
  const { userId } = auth();
  console.log('👤 User ', userId);

  // Add your Route Handler logic here

  return NextResponse.json({ message: 'Hello world!' }, { status: 200 });
}
