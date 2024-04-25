'use client';

import { classNames } from '@helpers/index';
import {
  ChartPieIcon,
  DocumentDuplicateIcon,
  UserIcon,
  HomeIcon,
  UsersIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { useUser, useClerk } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import UserProfileCard from './UserProfileCard';
import Logo from '@components/Logo';

export default function Navigation() {
  const { isSignedIn, user, isLoaded } = useUser();
  const path = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: path === '/dashboard',
    },
    {
      name: 'Customers',
      href: '/customers',
      icon: UsersIcon,
      count: '5',
      current: path === '/customers',
    },
    {
      name: 'Invoices',
      href: '/invoices',
      icon: DocumentDuplicateIcon,
      count: '12',
      current: path === '/invoices',
    },
    {
      name: 'Stripe',
      href: '/stripe',
      icon: LinkIcon,
      count: '20+',
      current: false,
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: ChartPieIcon,
      current: path === '/reports',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
      current: false,
    },
  ];

  const teams = [
    {
      name: 'Feature Request',
      href: '/new-features',
      initial: 'F',
      current: path === '/new-features',
    },
    {
      name: 'Help & Support',
      href: '/support',
      initial: 'S',
      current: path === '/support',
    },
  ];

  function signOutUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    // --------------------------------------------------------------------------------
    // 📌 Sign Out User from current session
    // --------------------------------------------------------------------------------
    signOut(() => router.push('/'));
  }

  return (
    <div className="fixed inset-x-0 top-0 w-fit flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 min-h-screen px-6">
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
              Account Reports
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
            <button
              onClick={signOutUser}
              className="rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
            >
              Sign out
            </button>
            {isLoaded && (
              <UserProfileCard
                href="/dashboard"
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
