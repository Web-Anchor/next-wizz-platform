'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { classNames } from '@helpers/index';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

type Props = {
  open?: boolean;
  class?: string;
  setter?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function UserNotification(props: Props) {
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
    <>
      <div
        aria-live="assertive"
        className={classNames(
          'pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6',
          'items-end'
        )}
      >
        <div
          className={classNames(
            'flex w-full flex-col items-center space-y-4 sm:items-end',
            'items-center',
            props.class
          )}
        >
          <Transition
            show={props.open ?? false}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto flex w-full max-w-md divide-x divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex w-0 flex-1 items-center p-4">
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-900">
                    Receive notifications
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Notifications may include alerts, sounds, and badges.
                  </p>

                  <section className="border-t pt-2 mt-2">
                    <button
                      onClick={signOutUser}
                      className="px-3 py-1 btn-ghost flex flex-row justify-center gap-2 hover:bg-transparent hover:opacity-80"
                    >
                      <ArrowRightStartOnRectangleIcon className="h-4 w-4 self-center" />
                      <p className="text-sm font-semibold">Sign out</p>
                    </button>
                  </section>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col divide-y divide-gray-200">
                  <div className="flex h-0 flex-1">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-none rounded-tr-lg border border-transparent px-4 py-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={(e) => props?.setter?.(e)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
