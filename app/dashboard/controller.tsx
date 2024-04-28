'use client';

import Wrapper from '@app/components/Wrapper';
import {
  useCustomersMonthGrowth,
  useTotalCharges,
  useTotalCustomers,
} from '@hooks/stats';
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/20/solid';
import { classNames, convertToK } from '@helpers/index';
import Link from 'next/link';

export default function Page() {
  const { charges } = useTotalCharges({});
  const { customers } = useTotalCustomers({});
  const { data } = useCustomersMonthGrowth({});
  console.log(`Stats `, data);

  return (
    <Wrapper>
      <div className="stats text-primary-content">
        <div className="stat">
          <div className="stat-figure">
            <CurrencyDollarIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Charges</div>
          <div className="stat-value">{convertToK(charges)}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <UserGroupIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value">{convertToK(customers)}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <UserGroupIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <section>
        <h3 className="text-base font-semibold leading-6 text-gray-900 my-5">
          Last 30 days
        </h3>

        <section className="flex flex-1 flex-row gap-5 flex-wrap">
          <div className="relative min-w-80 overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <UserGroupIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                Customers
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {data?.currentTotalCustomers}
              </p>
              <p
                className={classNames(
                  data?.percentage >= 0 ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {data?.percentage >= 0 ? (
                  <ArrowUpIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {data?.percentage >= 0 ? 'Increased' : 'Decreased'} by{' '}
                </span>
                {data?.percentage}
              </p>
              <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/dashboard/customers"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all<span className="sr-only"> stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>

          <div className="relative min-w-80 overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <CurrencyDollarIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                Charges
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {data?.currentTotalCustomers}
              </p>
              <p
                className={classNames(
                  data?.percentage >= 0 ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {data?.percentage >= 0 ? (
                  <ArrowUpIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {data?.percentage >= 0 ? 'Increased' : 'Decreased'} by{' '}
                </span>
                {data?.percentage}
              </p>
              <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/dashboard/charges"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all<span className="sr-only"> stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        </section>
      </section>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
