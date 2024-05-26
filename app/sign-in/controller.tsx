'use client';

import Button from '@app/components/Button';
import Logo from '@app/components/Logo';
import Wrapper from '@app/components/Wrapper';
import { SignIn } from '@clerk/nextjs';
import { useSignIn } from '@clerk/nextjs';
import { Spinner } from '@components/Skeleton';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const { isLoaded, signIn } = useSignIn();
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');
  const router = useRouter();

  return (
    <Wrapper class="mt-auto">
      <Button
        title="Home"
        onClick={() => router.push('/')}
        class="sticky top-4 lg:top-8 self-end w-fit"
        style="link"
      />
      {!isLoaded && <Spinner />}
      <section className="justify-center items-center flex flex-col gap-5 h-full">
        {isLoaded && (
          <>
            <Logo />
            <SignIn
              afterSignInUrl={
                `/api/v1/auth-login` + (redirect ? `?redirect=${redirect}` : '')
              }
              path="/sign-in"
            />
          </>
        )}
      </section>
    </Wrapper>
  );
}
