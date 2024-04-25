'use client';

import { UserProfile } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import { UserCardSkeleton } from '@components/Skeleton';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log('👤 User ', user);

  if (!isLoaded) {
    return (
      <>
        <UserCardSkeleton />
      </>
    );
  }

  return (
    <section className="flex justify-center">
      <UserProfile />
    </section>
  );
}
