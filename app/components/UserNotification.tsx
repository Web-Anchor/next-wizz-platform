'use client';

import { classNames } from '@helpers/index';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@components/Button';

type Props = {
  open?: boolean;
  class?: string;
  setter?: (value: boolean) => void;
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

  console.log(props);

  return (
    <>
      <div
        className={classNames(
          'absolute shadow-md top-5 left-[100vw] w-[480px] left-popup-container rounded-md bg-white bg-opacity-95 p-4',
          !props?.open && 'hidden'
        )}
      >
        <div className="flex">
          <div className="flex-shrink-0" onClick={() => props?.setter?.(false)}>
            <XCircleIcon
              className="cursor-pointer h-5 w-5 text-gray-800"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There were 2 errors with your submission
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                <li>Your password must be at least 8 characters</li>
                <li>
                  Your password must include at least one pro wrestling
                  finishing move
                </li>
              </ul>
            </div>
            <section className="pt-2 mt-2">
              <h2 className="text-lg font-semibold">User Notification</h2>
            </section>
            <section className={classNames('border-t pt-2 mt-2')}>
              <button
                onClick={signOutUser}
                className="px-3 py-1 btn-ghost flex flex-row justify-center gap-2 hover:bg-transparent hover:opacity-80"
              >
                <p>Sign out</p>
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
