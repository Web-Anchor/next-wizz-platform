import { capitalize, classNames } from '@helpers/index';
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { StatsCardSkeleton } from './Skeleton';

type Props = {
  currentTotal?: number;
  previousTotal?: number | string;
  percentage?: number;
  isLoading?: boolean;
  type?: 'customers' | 'payments';
  link?: string;
  linkTitle?: string;
  title?: string;
  description?: string;
};

const ICON = {
  customers: UserGroupIcon,
  payments: CurrencyDollarIcon,
};

export default function StatsCard(props: Props): React.ReactElement {
  const percentage = props?.percentage ?? 0;
  const Icon = ICON[props?.type ?? 'customers'];

  if (props.isLoading) {
    return <StatsCardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2 relative min-w-full sm:min-w-64 overflow-hidden rounded-lg px-4 py-5 shadow sm:px-6">
      <section className="flex flex-row gap-5">
        <div className="rounded-md w-fit h-fit bg-indigo-500 p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <section className="flex flex-col">
          {props.title && (
            <section className="max-w-xs truncate text-sm font-semibold text-gray-600">
              {props.title}
            </section>
          )}

          <section className="flex items-baseline">
            {props?.currentTotal && (
              <section className="text-2xl font-semibold text-gray-800">
                {props?.currentTotal}
              </section>
            )}
            <section
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

              <section className="flex gap-2">
                <section className="sr-only">
                  {percentage >= 0 ? 'Increased' : 'Decreased'} by{' '}
                </section>
                {percentage}
                {props?.previousTotal && (
                  <section className="stat-desc text-indigo-600 self-end">
                    {props?.previousTotal}
                  </section>
                )}
              </section>
            </section>
          </section>
        </section>
      </section>
      {props.description && (
        <section className="stat-desc">{props.description}</section>
      )}
      {props.link && (
        <div className="text-sm">
          <Link
            href={props?.link}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {props?.linkTitle ?? 'View all'}
            <section className="sr-only"> stats</section>
          </Link>
        </div>
      )}
    </div>
  );
}
