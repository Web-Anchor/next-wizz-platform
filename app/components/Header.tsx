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

  const landingPath = path === '/';
  const link =
    'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700';
  const activeLink =
    'block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700';

  return (
    <Disclosure
      as="nav"
      className={classNames(
        'fixed inset-x-0 top-0 z-50 backdrop-blur bg-white bg-opacity-90',
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
              <div className="flex flex-1 items-center ml-16 sm:ml-0 sm:items-stretch sm:justify-start">
                <Logo />
                {landingPath && (
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    {isSignedIn && landingPath && (
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href="#pricing"
                      scroll
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
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
                {isSignedIn && (
                  <UserProfileCard
                    href="/dashboard"
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
                {!isSignedIn && landingPath && isLoaded && (
                  <Link
                    href="/sign-in"
                    className="rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                  >
                    Sign in
                  </Link>
                )}
                {!isSignedIn && isLoaded && !path?.includes('/dashboard') && (
                  <Link
                    href="/"
                    className="rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                  >
                    Home
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {isSignedIn && (
              <div className="space-y-1 pb-4 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Link
                  href="/dashboard"
                  className={path === '/dashboard' ? activeLink : link}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/charges"
                  className={path === '/dashboard/charges' ? activeLink : link}
                >
                  Charges
                </Link>
                <Link
                  href="/dashboard/customers"
                  className={
                    path === '/dashboard/customers' ? activeLink : link
                  }
                >
                  Customers
                </Link>
                <Link
                  href="/dashboard/invoices"
                  className={path === '/dashboard/invoices' ? activeLink : link}
                >
                  Invoices
                </Link>
                <Link
                  href="/dashboard/stripe"
                  className={path === '/dashboard/stripe' ? activeLink : link}
                >
                  Stripe
                </Link>
                <Link
                  href="/dashboard/reports"
                  className={path === '/dashboard/reports' ? activeLink : link}
                >
                  Reports
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={path === '/dashboard/profile' ? activeLink : link}
                >
                  Profile
                </Link>
              </div>
            )}
            {landingPath && (
              <div className="space-y-1 pb-4 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Link
                  href="#projects"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Projects
                </Link>
                <Link
                  href="#questions"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Questions
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
