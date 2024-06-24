'use client';

import { classNames } from '@helpers/index';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import UserProfileCard from '@components/UserProfileCard';
import Logo from '@components/Logo';
import {
  useStripeKeys,
  useSubscription,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/index';
import Link from 'next/link';
import Badge from '@components/Badge';
import {
  mainNav,
  menuNav,
  showMainNavRoutes,
  showMenuNavRoutes,
} from '@helpers/data';

export default function DesktopNav() {
  const path = usePathname();

  const { user, isLoaded } = useUser();
  const { data, count, hasKeys } = useStripeKeys({});
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});
  const { active, basic, advanced, pro } = useSubscription({});

  const navigation = mainNav({
    show: showMainNavRoutes({ active, basic, advanced, pro }),
    path,
    count: [
      { href: '/dashboard/charges', count: charges },
      { href: '/dashboard/customers', count: customers },
      { href: '/dashboard/stripe', count },
    ],
  });
  const dashboard = menuNav({
    path,
    show: showMenuNavRoutes({ active, basic, advanced, pro }),
  });

  const Support = () => {
    return dashboard.map((team) => {
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
                {navigation.map((item, key) => {
                  return (
                    <li key={key}>
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
  );
}
