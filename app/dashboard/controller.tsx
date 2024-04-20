'use client';

import { UserProfile } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import Skeleton from '@components/Skeleton';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log('👤 User ', isSignedIn, user);

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <section className="flex justify-center">
      <UserProfile />
    </section>
  );
}
