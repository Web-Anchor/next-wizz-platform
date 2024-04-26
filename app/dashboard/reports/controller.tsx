'use client';

import { useUser } from '@clerk/clerk-react';
import { CardSkeleton } from '@components/Skeleton';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log('👤 User ', user);

  if (!isLoaded) {
    return <CardSkeleton />;
  }

  return (
    <section className="flex justify-center">
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        User Reports & Stats
      </h1>
    </section>
  );
}
