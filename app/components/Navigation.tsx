'use client';

import { classNames } from '@helpers/index';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import UserProfileCard from './UserProfileCard';
import Logo from '@components/Logo';
import {
  useKeyValidate,
  useStripeKeys,
  useSubscription,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/index';
import { useState, Fragment } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import ProfileButton from './ProfileButton';
import Link from 'next/link';
import Badge from './Badge';
import { mainNav, menuNav } from '@helpers/data';
import Notifications from '@components/Notifications';

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{ open: boolean }>({ open: false });
  const path = usePathname();

  const { isSignedIn, user, isLoaded } = useUser();
  const { data, count, hasKeys } = useStripeKeys({});
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});
  const { active } = useSubscription({});

  const navigation = mainNav({
    path,
    hidden: !active ? ['/dashboard/reports', '/dashboard/profile'] : undefined,
    count: [
      { href: '/dashboard/charges', count: charges },
      { href: '/dashboard/customers', count: customers },
      { href: '/dashboard/stripe', count },
    ],
  });
  const dashboard = menuNav({
    path,
    hidden: !active ? ['/dashboard/new-features'] : undefined,
  });

  const Support = () => {
    return dashboard.map((team) => {
      if (team.isHidden) return null;
      const isSupport = team.name === 'Help & Support';

      return (
        <li key={team.name}>
          <Link
            href={team.href}
            className={classNames(
              team.current
                ? 'bg-gray-50 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            )}
          >
            <span
              className={classNames(
                'relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                team.current
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                team.name === 'Help & Support' &&
                  'border-green-500 text-green-500 bg-green-50'
              )}
            >
              {team.initial}
              {isSupport && (
                <Badge class="absolute -top-3 -right-2 p-0" type="success" />
              )}
            </span>
            <span className="truncate">{team.name}</span>
          </Link>
        </li>
      );
    });
  };

  return (
    <section className="z-10 w-full">
      <Transition.Root show={state?.open} as={Fragment}>
        <Dialog
          className="relative z-50 lg:hidden"
          onClose={() => setState((prev) => ({ ...prev, open: false }))}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() =>
                        setState((prev) => ({ ...prev, open: false }))
                      }
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <Logo />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            if (item.isHidden) return null;

                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? 'text-indigo-600'
                                        : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                          Manage & Support
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          <Support />
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Logo />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    if (item.isHidden) return null;

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}

                          {item.count && (
                            <span className="flex items-center ml-auto px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 rounded-md">
                              {item.count}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Manage & Support
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  <Support />
                </ul>
              </li>
              <li className="flex flex-col gap-5 mb-6 mt-auto ">
                {!isLoaded && (
                  <div className="flex flex-col gap-4 w-fit">
                    <div className="flex gap-4 items-center">
                      <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                      <div className="flex flex-col gap-2">
                        <div className="skeleton h-4 w-16"></div>
                        <div className="skeleton h-4 w-24"></div>
                      </div>
                    </div>
                  </div>
                )}
                {isLoaded && (
                  <UserProfileCard
                    imgSrc={user?.imageUrl}
                    firstName={user?.firstName as string}
                    lastName={user?.lastName as string}
                    description={user?.lastName as string}
                  />
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setState((prev) => ({ ...prev, open: true }))}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <section className="flex-1">
          <Link
            href="/dashboard"
            className={classNames(
              'items-center px-1 pt-1 text-sm font-medium text-gray-800 hover:border-gray-300 hover:text-gray-700',
              path !== '/dashboard' && 'text-indigo-600'
            )}
          >
            Dashboard
          </Link>
        </section>

        <Notifications />
        <ProfileButton />
      </div>

      <main className="flex flex-1 h-screen flex-col lg:pl-72">{children}</main>
    </section>
  );
}
