'use client';

import { useSignIn } from '@clerk/clerk-react';
import Skeleton from '@components/Skeleton';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const { isLoaded, signIn } = useSignIn();

  const account = params.get('account') ?? 'default';

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <section className="flex justify-center">
      <p>Invoicing APP</p>
      <p>Select your invoices</p>
    </section>
  );
}
