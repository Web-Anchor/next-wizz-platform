'use client';

import { useTotalCharges } from '@hooks/stats';

export default function Page() {
  const { data } = useTotalCharges({});
  console.log(`Stats `, data);

  return (
    <section className="flex justify-center">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Stripe Dashboard & stats
      </h1>
    </section>
  );
}
