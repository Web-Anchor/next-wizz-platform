'use client';

import Logo from '@app/components/Logo';
import { SignIn } from '@clerk/nextjs';
import { useSignIn } from '@clerk/nextjs';
import { CardSkeleton } from '@components/Skeleton';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const { isLoaded, signIn } = useSignIn();
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');

  return (
    <section className="flex flex-1 flex-col h-screen justify-center content-center">
      <section className="self-center flex flex-col gap-5 justify-center content-center">
        <div className="self-center">
          <Logo />
        </div>
        {!isLoaded && <CardSkeleton />}
        <SignIn
          afterSignInUrl={
            `/api/v1/auth-login` + redirect && `?redirect=${redirect}`
          }
          path="/sign-in"
        />
      </section>
    </section>
  );
}
