import { classNames } from '@helpers/index';
import Badge from './Badge';
import Link from 'next/link';
import { useKeyValidate } from '@hooks/useValidateApiKeys';
import { useStripeKeys } from '@hooks/useStripeKeys';
import { useSubscription } from '@hooks/useSubscriptions';

type Props = {
  onClick?: (props?: any) => void;
  class?: string;
  hide?: boolean;
};

export default function Notifications(props: Props): React.ReactElement | null {
  const { data, count, hasKeys } = useStripeKeys({});
  const { active } = useSubscription({});
  const { error } = useKeyValidate({
    key: data?.[0]?.restrictedAPIKey,
  });

  if (props.hide) {
    return null;
  }

  return (
    <section className={classNames(props.class)}>
      {!active && (
        <Badge
          title="No Subscription"
          type="warning"
          tooltip="Please subscribe to use the platform!"
        />
      )}
      {(!hasKeys || error) && (
        <Badge
          title={error ? 'Invalid Stripe API Key' : 'Add Stripe API Key'}
          type="error"
          tooltip={
            error
              ? 'Please update your keys'
              : 'Please add your Stripe keys to use the platform!'
          }
          tooltipPosition="tooltip-left"
          description={
            <Link
              href="/dashboard/stripe"
              className="text-xs font-semibold text-indigo-600"
            >
              {error ? 'Update keys' : 'Add keys'}
            </Link>
          }
        />
      )}
    </section>
  );
}
