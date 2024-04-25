'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@helpers/index';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import UserProfileCard from './UserProfileCard';
import Logo from './Logo';

type Props = {
  class?: string;
};

export default function Header(props: Props) {
  const path = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();

  const homePath = path === '/';
  const link =
    'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';
  const activeLink =
    'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900';

  return (
    <Disclosure
      as="nav"
      className={classNames(
        'fixed inset-x-0 top-0 z-50 backdrop-blur bg-white bg-opacity-80',
        props.class
      )}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {homePath && <Logo />}
                {homePath && (
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    {isSignedIn && homePath && (
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link href="#pricing" scroll className={classNames(link)}>
                      Pricing
                    </Link>
                    <Link
                      href="#facts"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Facts
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  href="/api/delay"
                  className="rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                >
                  API Tester
                </Link>
                {!isSignedIn && homePath && (
                  <Link
                    href="/sign-in"
                    className="rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                  >
                    Sign in
                  </Link>
                )}
                {!homePath && (
                  <Link
                    href="/"
                    className="rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                  >
                    Home
                  </Link>
                )}
                <UserProfileCard
                  href="/dashboard"
                  imgSrc={user?.imageUrl}
                  firstName={user?.firstName as string}
                  order="right"
                />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Calendar
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
