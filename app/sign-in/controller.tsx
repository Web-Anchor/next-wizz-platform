'use client';

import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import PageHeadings from '@app/components/PageHeadings';
import { Spinner } from '@app/components/Skeleton';
import { SignIn, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams()!;
  const redirect = searchParams.get('redirect');

  return (
    <Wrapper class="pt-5">
      <ClerkLoading>
        <SectionWrapper class="items-center">
          <Spinner />
          <div className="h-[400px] w-[400px]" />
        </SectionWrapper>
      </ClerkLoading>

      <ClerkLoaded>
        <SectionWrapper class="items-center">
          <CardWrapper>
            <SignIn afterSignInUrl={`/api/v1/auth?redirect=${redirect}`} />
          </CardWrapper>
          <SectionWrapper class="flex-row gap-5 w-[400px] text-nowrap items-center">
            <PageHeadings description="Don't have an account?" class="w-fit" />
            <Link
              href={`/sign-up?redirect=${redirect}`}
              className="bg-transparent items-center px-0 text-sm font-semibold text-indigo-600 shadow-none hover:bg-transparent hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </Link>
          </SectionWrapper>
        </SectionWrapper>
      </ClerkLoaded>
    </Wrapper>
  );
}

export function CardWrapper(props: { children: React.ReactNode }) {
  return <section className="shadow-md rounded-2xl">{props.children}</section>;
}
