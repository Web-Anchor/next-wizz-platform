'use client';

import { classNames } from '@helpers/index';
import {
  ChartPieIcon,
  DocumentDuplicateIcon,
  UserIcon,
  HomeIcon,
  UsersIcon,
  LinkIcon,
  CurrencyDollarIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import UserProfileCard from './UserProfileCard';
import Logo from '@components/Logo';
import {
  useStripeKeys,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/index';
import { useEffect, useRef, useState, Fragment } from 'react';
import { toast } from 'sonner';
import { Dialog, Transition } from '@headlessui/react';
import ProfileButton from './ProfileButton';
import Link from 'next/link';

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{ open: boolean }>({ open: false });
  const { isSignedIn, user, isLoaded } = useUser();
  const { data, isLoading: keyFetching } = useStripeKeys({});
  const path = usePathname();
  const loadRef = useRef(true);

  const { count, isLoading: stLoading } = useStripeKeys({});
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: path === '/dashboard',
    },
    {
      name: 'Charges',
      href: '/dashboard/charges',
      icon: CurrencyDollarIcon,
      count: charges,
      current: path === '/dashboard/charges',
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
      icon: UsersIcon,
      count: customers,
      current: path === '/dashboard/customers',
    },
    {
      name: 'Templates',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
      count: '1',
      current: path === '/dashboard/invoices',
    },
    {
      name: 'Stripe API keys',
      href: '/dashboard/stripe',
      icon: LinkIcon,
      count: count,
      current: path === '/dashboard/stripe',
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: ChartPieIcon,
      current: path === '/dashboard/reports',
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: UserIcon,
      current: path === '/dashboard/profile',
    },
  ];

  const teams = [
    {
      name: 'Feature Request',
      href: '/dashboard/new-features',
      initial: 'F',
      current: path === '/dashboard/new-features',
    },
    {
      name: 'Help & Support',
      href: '/dashboard/support',
      initial: 'H',
      current: path === '/dashboard/support',
    },
    {
      name: 'Subscriptions',
      href: '/dashboard/subscriptions',
      initial: 'S',
      current: path === '/dashboard/subscriptions',
    },
  ];

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 📌  Notification hook
    // --------------------------------------------------------------------------------
    if (data && !data?.length && loadRef.current) {
      toast.error('Please add Stripe API keys to use a platform.');
      loadRef.current = false;
    }

    console.log('StripeKeys', data);
  }, [data]);

  return (
    <section className="z-10 w-full">
      <Transition.Root show={state?.open} as={Fragment}>
        <Dialog
          className="relative z-50 lg:hidden"
          onClose={() => setState((prev) => ({ ...prev, open: false }))}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
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
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <Logo />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
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
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                          Your teams
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {teams.map((team) => (
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
                                    team.current
                                      ? 'text-indigo-600 border-indigo-600'
                                      : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                  )}
                                >
                                  {team.initial}
                                </span>
                                <span className="truncate">{team.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
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
                  {navigation.map((item) => (
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
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
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
                            team.current
                              ? 'text-indigo-600 border-indigo-600'
                              : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </Link>
                    </li>
                  ))}
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
              'items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-gray-300 hover:text-gray-700',
              path !== '/dashboard' && 'text-indigo-600'
            )}
          >
            Dashboard
          </Link>
        </section>
        <ProfileButton />
      </div>

      <main className="flex flex-1 h-screen flex-col lg:pl-72">{children}</main>
    </section>
  );
}
