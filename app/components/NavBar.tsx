'use client';

import { classNames } from '@helpers/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default function NavBar() {
  const path = usePathname();

  const menu = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Sign In',
      path: '/sign-in',
    },
    {
      name: 'Sign Up',
      path: '/sign-up',
    },
    {
      name: 'Dashboard',
      subMenu: [
        {
          name: 'Dashboard',
          path: '/dashboard',
        },
        {
          name: 'Profile',
          path: '/dashboard/profile',
        },
        {
          name: 'Settings',
          path: '/dashboard/settings',
        },
      ],
    },
  ];

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-gray-200"
          >
            {menu.map((item) => {
              return (
                <li
                  key={item.name}
                  className={classNames(
                    'text-red-200',
                    path?.includes(item.path!) ? 'bg-gray-400' : ''
                  )}
                >
                  {item.subMenu ? (
                    <details>
                      <summary>{item.name}</summary>
                      <ul className="p-2">
                        {item.subMenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link href={subItem.path}>{subItem.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.path}>{item.name}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menu.map((item) => {
            return (
              <li
                key={item.name}
                className={classNames(
                  path?.endsWith(item.path!) ? 'font-bold' : ''
                )}
              >
                {item.subMenu ? (
                  <details>
                    <summary>{item.name}</summary>
                    <ul className="p-2 border-gray-300 bg-gray-200">
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link href={subItem.path}>{subItem.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
        <UserButton afterSignOutUrl="/" signInUrl="/sign-in" showName />
      </div>
    </div>
  );
}
