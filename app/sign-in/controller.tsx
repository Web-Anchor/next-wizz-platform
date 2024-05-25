'use client';

import Logo from '@app/components/Logo';
import Wrapper from '@app/components/Wrapper';
import { SignIn } from '@clerk/nextjs';
import { useSignIn } from '@clerk/nextjs';
import { CardSkeleton } from '@components/Skeleton';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const { isLoaded, signIn } = useSignIn();
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');

  return (
    <Wrapper>
      <section className="justify-center items-center flex flex-col gap-5 h-full">
        <Logo />
        {!isLoaded && <CardSkeleton />}
        <SignIn
          afterSignInUrl={
            `/api/v1/auth-login` + (redirect ? `?redirect=${redirect}` : '')
          }
          path="/sign-in"
        />
      </section>
    </Wrapper>
  );
}
