'use client';

import { SignIn } from '@clerk/nextjs';
import { useSignIn } from '@clerk/nextjs';
import { CardSkeleton } from '@components/Skeleton';

export default function Page() {
  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) {
    return <CardSkeleton />;
  }

  return (
    <section className="flex justify-center">
      <SignIn
        afterSignInUrl="/api/v1/auth-login"
        path="/sign-in"
        appearance={{
          layout: {
            logoImageUrl:
              'https://plus.unsplash.com/premium_photo-1689247409203-8002a974e018?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          },
        }}
      />
    </section>
  );
}
