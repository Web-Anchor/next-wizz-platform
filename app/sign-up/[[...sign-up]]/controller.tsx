'use client';

import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import PageHeadings from '@app/components/PageHeadings';
import { Spinner } from '@app/components/Skeleton';
import { SignUp, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from '@app/sign-in/[[...sign-in]]/controller';

export default function Page() {
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');

  let { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Wrapper class="pt-5">
        <SectionWrapper class="items-center h-[400px] w-[400px]">
          <Spinner />
        </SectionWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SectionWrapper class="items-center">
        <CardWrapper>
          <SignUp forceRedirectUrl={redirect || `/api/v1/auth`} />
        </CardWrapper>
        <SectionWrapper class="flex-row text-nowrap items-center">
          <PageHeadings description="Already have an account?" class="w-fit" />
          <Link
            href={`/sign-in?redirect=${redirect}`}
            className="bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign In
          </Link>
        </SectionWrapper>
      </SectionWrapper>
    </Wrapper>
  );
}
