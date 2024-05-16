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
} from '@heroicons/react/24/outline';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import UserProfileCard from './UserProfileCard';
import Logo from '@components/Logo';
import {
  useStripeKeys,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/index';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function Navigation() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { data, isLoading: keyFetching } = useStripeKeys({});
  const path = usePathname();
  console.log('path', data);
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
    <div className="hidden sm:flex fixed inset-x-0 bg-white z-10 top-0 min-w-56 w-fit grow flex-col gap-y-5 border-r border-gray-200 min-h-screen px-6">
      <div className="flex h-16 shrink-0 items-center">
        <Logo />
        <p className="text-sm font-semibold text-gray-700 ml-2">
          Invoice Visard
        </p>
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
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Shortcuts
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
  );
}
