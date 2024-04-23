'use client';

import { useSignIn } from '@clerk/clerk-react';
import Skeleton from '@components/Skeleton';
import { useCharges } from '@hooks/charges';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const account = params.get('account') ?? 'user_2fDlAdhkEfI0CyBwToeSpWkT9wB';
  const { isLoaded, signIn } = useSignIn();
  const { charges, cError, next_page } = useCharges({ account });
  console.log('🧾 Charges', cError, next_page, charges);

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <section className="flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-lg">Invoicing APP</h1>
      <p>Logic for Customer portal application</p>
    </section>
  );
}
