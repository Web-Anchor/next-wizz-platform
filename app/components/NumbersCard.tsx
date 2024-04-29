import { capitalize, classNames, convertToK } from '@helpers/index';
import { CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/20/solid';

type Props = {
  number?: number;
  isLoading?: boolean;
  icon?: 'customers' | 'payments';
  title?: string;
};

const ICON = {
  customers: UserGroupIcon,
  payments: CurrencyDollarIcon,
};

export default function NumbersCard(props: Props): React.ReactElement {
  const Icon = ICON[props?.icon ?? 'customers'];

  return (
    <section className="relative min-w-full sm:min-w-64 overflow-hidden rounded-lg bg-white shadow">
      <div className="stat">
        <div className="stat-figure">
          <Icon className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title">
          {capitalize(props?.title ?? 'customers', true)}
        </div>
        <div className="stat-value">{convertToK(props.number)}</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>
    </section>
  );
}
