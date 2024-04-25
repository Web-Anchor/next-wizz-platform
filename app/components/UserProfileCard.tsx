import Link from 'next/link';
import Image from 'next/image';
import { classNames } from '@helpers/index';

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
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  return (
    <Link href={href ?? '#'} className="group block flex-shrink-0">
      <div className="flex flex-row gap-2 items-center">
        <div
          className={classNames(
            'order-1',
            order === 'right' ? 'order-2' : undefined
          )}
        >
          {!imgSrc && (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
              <span className="font-medium leading-none text-white">
                {initials}
              </span>
            </span>
          )}
          {imgSrc && (
            <Image
              className="inline-block h-9 w-9 rounded-full"
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
    </Link>
  );
}
