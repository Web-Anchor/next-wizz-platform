import {
  clerkMiddleware,
  createRouteMatcher,
  auth,
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  if (isProtectedRoute(req) && !userId) {
    console.log('🔐 User is not authenticated');
    // auth().protect(); // 🚧 throws 404
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
