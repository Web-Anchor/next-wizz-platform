import { capitalize, classNames } from '@helpers/index';
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';

type Props = {
  currentTotal?: number;
  previousTotal?: number;
  percentage?: number;
  isLoading?: boolean;
  type?: 'customers' | 'payments';
  link?: string;
  title?: string;
};

const ICON = {
  customers: UserGroupIcon,
  payments: CurrencyDollarIcon,
};

export default function StatsCard(props: Props): React.ReactElement {
  const percentage = props?.percentage ?? 0;
  const Icon = ICON[props?.type ?? 'customers'];

  return (
    <div className="relative min-w-full sm:min-w-64 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6">
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {capitalize(props.title || props?.type || 'customers', true)}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">
          {props?.currentTotal}
        </p>
        <p
          className={classNames(
            percentage >= 0 ? 'text-green-600' : 'text-red-600',
            'ml-2 flex items-baseline text-sm font-semibold'
          )}
        >
          {percentage >= 0 ? (
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
            {percentage >= 0 ? 'Increased' : 'Decreased'} by{' '}
          </span>
          {percentage}
        </p>
        {props.link && (
          <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href={props?.link}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all<span className="sr-only"> stats</span>
              </Link>
            </div>
          </div>
        )}
      </dd>
    </div>
  );
}
