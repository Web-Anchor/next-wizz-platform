'use client';

import { useState } from 'react';
import { classNames } from '@helpers/index';
import UserProfileCard from './UserProfileCard';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { fakerUser } from '@lib/faker';

type Props = {
  hide?: boolean;
};

export default function ProfileButton(props: Props): React.ReactElement {
  const [state, setState] = useState<{ open?: boolean }>({});
  let { isSignedIn, user, isLoaded } = useUser();
  // user = fakerUser(true); // faker data
  const { signOut } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const id = searchParams.get('id');

  function signOutUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    // --------------------------------------------------------------------------------
    // 📌 Sign Out User from current session
    // --------------------------------------------------------------------------------
    signOut(() => router.push(`/sign-in` + id && `?id=${id}`));
  }

  return (
    <section className={classNames('relative ml-3')}>
      <div
        onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
        className="relative cursor-pointer"
      >
        {isSignedIn && (
          <UserProfileCard
            imgSrc={user?.imageUrl}
            firstName={user?.firstName as string}
            order="right"
            disabled
          />
        )}
        {!isLoaded && (
          <div className="flex flex-col gap-4 w-fit">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-8"></div>
              </div>
              <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            </div>
          </div>
        )}
      </div>

      <div
        className={classNames(
          'absolute shadow-md top-14 min-w-[200px] right-0 rounded-xl bg-white p-4 ring-1 ring-indigo-600',
          !state?.open && 'hidden'
        )}
      >
        <div className="relative flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none"
          >
            Dashboard
          </Link>
          <section className={classNames('border-t pt-2')}>
            <div
              className="cursor-pointer bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none"
              onClick={signOutUser}
            >
              Sign out
            </div>
          </section>
          <div
            className="absolute -top-3 -right-3 flex-shrink-0"
            onClick={() => setState((prev) => ({ ...prev, open: false }))}
          >
            <XCircleIcon
              className="cursor-pointer h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
