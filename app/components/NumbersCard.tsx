import { CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { StatsCardSkeleton } from './Skeleton';

type Props = {
  number?: number | string;
  currency?: string;
  isLoading?: boolean;
  icon?: 'customers' | 'payments';
  title?: string;
  subTitle?: string;
  description?: string;
  subDescription?: string;
  about?: string;
  loading?: boolean;
};

const ICON = {
  customers: UserGroupIcon,
  payments: CurrencyDollarIcon,
};

export default function NumbersCard(props: Props): React.ReactElement {
  const Icon = ICON[props?.icon ?? 'customers'];

  if (props.isLoading) {
    return <StatsCardSkeleton />;
  }

  return (
    <section className="relative min-w-full lg:max-w-xs sm:min-w-64 overflow-hidden rounded-lg bg-white shadow">
      <div className="stat">
        <div className="stat-figure absolute top-4 right-3">
          <Icon className="inline-block w-8 h-8 stroke-current" />
        </div>
        {props?.title && (
          <div className="max-w-xs truncate text-sm font-semibold text-gray-600 mr-6">
            {props?.title}
          </div>
        )}
        <div className="stat-value my-2">
          {props.number || props.currency || 0}
        </div>

        {props.description && (
          <div className="stat-desc">{props.description}</div>
        )}
        {props.subDescription && (
          <div className="stat-desc text-wrap text-indigo-600">
            {props.subDescription}
          </div>
        )}
      </div>
    </section>
  );
}
