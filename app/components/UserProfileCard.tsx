'use client';

import Link from 'next/link';
import Image from 'next/image';
import { classNames } from '@helpers/index';
import UserNotifications from './UserNotification';
import { memo, useState } from 'react';

type Props = {
  href?: string;
  imgSrc?: string;
  imgAlt?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  order?: 'left' | 'right';
  disabled?: boolean;
};

function UserProfileCard(props: Readonly<Props>) {
  const [state, setState] = useState<{ open?: boolean }>({});

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (props?.href) {
      return <Link href={props?.href}>{children}</Link>;
    }

    return (
      <>
        <UserNotifications
          open={state?.open}
          setter={() => setState((prev) => ({ ...prev, open: !prev.open }))}
        />
        <section
          onClick={() =>
            !props?.disabled &&
            setState((prev) => ({ ...prev, open: !prev.open }))
          }
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
            props?.order === 'right' ? 'order-2' : undefined
          )}
        >
          {!props?.imgSrc && (
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
          {props?.imgSrc && (
            <Image
              className="inline-block rounded-full"
              src={props?.imgSrc}
              alt={props?.imgAlt ?? 'user-profile'}
              width={36}
              height={36}
            />
          )}
        </div>
        <div
          className={classNames(
            'order-2',
            props?.order === 'right' ? 'order-1 text-right' : undefined
          )}
        >
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {props?.firstName} {props?.lastName}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            {props?.description}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default memo(UserProfileCard);
