'use client';

import { Fragment } from 'react';
import { classNames } from '@helpers/index';
import { Menu, Transition } from '@headlessui/react';
import UserProfileCard from './UserProfileCard';
import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  hide?: boolean;
};

export default function ProfileButton(props: Props): React.ReactElement {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  function signOutUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    // --------------------------------------------------------------------------------
    // 📌 Sign Out User from current session
    // --------------------------------------------------------------------------------
    signOut(() => router.push('/'));
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {isSignedIn && (
            <UserProfileCard
              imgSrc={user?.imageUrl}
              firstName={user?.firstName as string}
              order="right"
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
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/dashboard"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Dashboard
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={signOutUser}
                className={classNames(
                  'block px-4 py-2 text-sm text-gray-700 w-[100%] text-start',
                  active && 'bg-gray-100'
                )}
              >
                <p>Sign out</p>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
