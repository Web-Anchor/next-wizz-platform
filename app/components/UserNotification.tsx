'use client';

import { classNames } from '@helpers/index';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@components/Button';
import Link from 'next/link';
import Logo from './Logo';

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

  return (
    <>
      <div
        className={classNames(
          'absolute shadow-md top-5 left-[100vw] min-w-[300px] left-popup-container rounded-xl bg-white bg-opacity-95 p-4',
          !props?.open && 'hidden'
        )}
      >
        <div className="relative flex flex-col gap-3">
          <Logo />
          <Link
            href="/"
            className="bg-transparent inline-flex items-center border-b-2 border-transparent px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent shadow-none"
          >
            Dashboard
          </Link>
          <section className={classNames('border-t pt-2')}>
            <Button style="ghost" onClick={signOutUser}>
              Sign out
            </Button>
          </section>
          <div
            className="absolute top-0 right-0 flex-shrink-0"
            onClick={() => props?.setter?.(false)}
          >
            <XCircleIcon
              className="cursor-pointer h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </>
  );
}
