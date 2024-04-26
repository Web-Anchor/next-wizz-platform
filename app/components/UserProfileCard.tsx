'use client';

import Link from 'next/link';
import Image from 'next/image';
import { classNames } from '@helpers/index';
import UserNotifications from './UserNotification';
import { useState } from 'react';

export default function UserProfileCard({
  href,
  imgSrc,
  imgAlt,
  firstName,
  lastName,
  description,
  order = 'left',
}: Readonly<{
  href?: string;
  imgSrc?: string;
  imgAlt?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  order?: 'left' | 'right';
}>) {
  const [state, setState] = useState<{ open?: boolean }>({});

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return (
      <>
        <UserNotifications
          open={state?.open}
          setter={() => setState((prev) => ({ ...prev, open: !prev.open }))}
          // add class with position fixed bottom right
          // class="fixed bottom-0 right-0"
        />
        <section
          onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
          className="cursor-pointer"
        >
          {children}
        </section>
      </>
    );
  };

  return (
    <Wrapper>
      <div className="flex flex-row gap-2 items-center">
        <div
          className={classNames(
            'order-1',
            order === 'right' ? 'order-2' : undefined
          )}
        >
          {!imgSrc && (
            <span className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}
          {imgSrc && (
            <Image
              className="inline-block rounded-full"
              src={imgSrc}
              alt={imgAlt ?? 'user-profile'}
              width={36}
              height={36}
            />
          )}
        </div>
        <div
          className={classNames(
            'order-2',
            order === 'right' ? 'order-1 text-right' : undefined
          )}
        >
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {firstName} {lastName}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
