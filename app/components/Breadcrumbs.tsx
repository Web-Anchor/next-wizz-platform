'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { classNames } from '@helpers/index';

type Props = {
  class?: string;
};

export default function Breadcrumbs(props: Props) {
  const path = usePathname();
  const crumbs = path?.split('/')?.filter(Boolean);

  const pages = crumbs?.map((part, index) => {
    return {
      name: part,
      href: `/${crumbs.slice(0, index + 1).join('/')}`,
      current: index === crumbs.length - 1,
    };
  });

  return (
    <nav
      className={classNames(
        'sticky top-0 z-10 flex mx-6 py-3 mb-10 border-b border-gray-900/10 bg-white bg-opacity-90',
        props.class
      )}
      aria-label="Breadcrumb"
    >
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
