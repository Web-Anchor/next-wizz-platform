'use client';

import { useUser } from '@clerk/nextjs';
import { useCharges } from '@hooks/charges';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const account = params.get('account') ?? 'user_2fDlAdhkEfI0CyBwToeSpWkT9wB';
  const { user } = useUser();
  const { charges, cError, next_page } = useCharges({ account });
  console.log('🧾 Charges', user, cError, next_page, charges);

  return (
    <section className="flex justify-center">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Stripe Customers & account Charges
      </h1>
    </section>
  );
}
