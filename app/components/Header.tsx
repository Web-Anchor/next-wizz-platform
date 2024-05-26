'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@helpers/index';
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import UserProfileCard from './UserProfileCard';
import Logo from '@components/Logo';
import { Disclosure } from '@headlessui/react';
import ProfileButton from './ProfileButton';

type Props = {
  class?: string;
};

export const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Charges',
    href: '/dashboard/charges',
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
  },
  {
    name: 'Stripe API',
    href: '/dashboard/stripe',
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
  },
];

export default function Header(props: Props) {
  const path = usePathname();
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

  const landingPath = path === '/';
  const mobActive =
    'block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700';
  const mobInactive =
    'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700';

  return (
    <>
      <Disclosure
        as="nav"
        className={classNames(
          'fixed inset-x-0 top-0 z-50 backdrop-blur bg-white bg-opacity-95',
          props.class
        )}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex flex-1 gap-5">
                  <div className="flex flex-shrink-0 items-center">
                    <Logo />
                  </div>
                  <div className="hidden sm:flex sm:space-x-8">
                    {landingPath && (
                      <div className="hidden sm:flex sm:space-x-8">
                        {isSignedIn && (
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
                        <Link
                          href="#"
                          className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                          Contact
                        </Link>
                      </div>
                    )}
                  </div>
                  {!isSignedIn && landingPath && isLoaded && (
                    <Link
                      href="/sign-in"
                      className="mr-5 sm:mr-0 rounded-md self-center ml-auto bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
                {isSignedIn && (
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                    </button>

                    {/* Profile dropdown */}
                    <ProfileButton />
                  </div>
                )}
                <div className="-mr-2 flex flex-row gap-2 items-center sm:hidden">
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
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {path !== '/' && (
                  <>
                    <Link href="/" scroll className={classNames(mobInactive)}>
                      Home
                    </Link>
                  </>
                )}
                {path === '/' && (
                  <>
                    <Link
                      href="#pricing"
                      scroll
                      className={classNames(mobInactive)}
                    >
                      Pricing
                    </Link>
                    <Link href="#facts" className={classNames(mobInactive)}>
                      Facts
                    </Link>
                    <Link href="#facts" className={classNames(mobInactive)}>
                      Contact
                    </Link>
                  </>
                )}
              </div>

              {isSignedIn && (
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <section className="px-4">
                    {isSignedIn && (
                      <UserProfileCard
                        imgSrc={user?.imageUrl}
                        firstName={user?.firstName as string}
                        order="left"
                        disabled
                      />
                    )}
                    {!isLoaded && (
                      <div className="flex flex-col gap-4 w-fit">
                        <div className="flex gap-4 items-center">
                          <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                          <div className="flex flex-col gap-2">
                            <div className="skeleton h-4 w-8"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                  <div className="mt-3 space-y-1">
                    {navigation.map((item, key) => (
                      <Link
                        key={key}
                        href={item.href}
                        className={classNames(
                          mobInactive,
                          path === item.href && mobActive
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <button
                      onClick={signOutUser}
                      className={classNames(mobInactive)}
                    >
                      <p>Sign out</p>
                    </button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
