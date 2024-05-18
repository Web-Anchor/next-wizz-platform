'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { convertToYearMonthDay, isSubActive } from '@helpers/index';
import { useSubscriptions } from '@hooks/index';
import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import { toast } from 'sonner';

export default function Page() {
  const [state, setState] = useState<{ fetching?: number | string }>({});
  const { subscriptions } = useSubscriptions({});
  console.log('Subs ', subscriptions);

  async function cancelSubscription(id: string) {
    try {
      setState({ fetching: id });

      const { data, status } = await cFetch({
        url: `/api/v1/stripe/subscriptions/cancel`,
        method: 'POST',
        data: { id },
      });

      if (status !== 200) {
        throw new Error(data?.message);
      }

      console.log('🔑 Data', data);
      toast.success('Subscription cancelled successfully');
      mutate(`/api/v1/stripe/subscriptions`);
    } catch (error: any) {
      console.error('🔑 Error', error);
      toast.error(error?.message);
    } finally {
      setState({ fetching: undefined });
    }
  }

  return (
    <Wrapper>
      <Table
        header={[
          { item: 'Plan' },
          { item: 'Amount' },
          { item: 'Currency', class: 'hidden lg:table-cell' },
          { item: 'Period End Date', class: 'hidden lg:table-cell' },
          { item: 'Created', class: 'hidden lg:table-cell' },
          { item: 'Active' },
          { item: 'Ending', class: 'hidden lg:table-cell' },
          { item: '' },
        ]}
        data={subscriptions?.map((subscription) => {
          return {
            row: [
              { item: planName(subscription?.plan?.amount!) },
              { item: convertToCurrency(subscription?.plan?.amount!) },
              { item: subscription.currency, class: 'hidden lg:table-cell' },
              {
                item: convertToYearMonthDay(subscription.current_period_end!),
                class: 'hidden lg:table-cell',
              },
              {
                item: convertToYearMonthDay(subscription.created!),
                class: 'hidden lg:table-cell',
              },
              {
                item: isSubActive(subscription) ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-500 opacity-75"
                    aria-hidden="true"
                  />
                ) : (
                  <NoSymbolIcon
                    className="h-5 w-5 text-red-500 opacity-75"
                    aria-hidden="true"
                  />
                ),
              },
              {
                item: subscription.ended_at
                  ? convertToYearMonthDay(subscription.ended_at)
                  : '-',
                class: 'hidden lg:table-cell',
              },
              {
                item: (
                  <Button
                    title="Cancel"
                    style="ghost"
                    onClick={() => cancelSubscription(subscription.id!)}
                    fetching={state.fetching === subscription.id}
                  />
                ),
              },
            ],
          };
        })}
        footer={
          <p className="text-sm leading-7 text-gray-600">
            Excepteur occaecat ex ad irure reprehenderit officia mollit ut nisi
            quis anim consequat veniam. Ad mollit quis occaecat culpa est ut
            nostrud. Laboris veniam commodo irure duis aliquip pariatur labore
            exercitation aliqua magna nostrud aliqua labore nostrud. Anim
            occaecat cillum cillum in sit esse cillum amet magna elit. Nostrud
            ut aliqua culpa qui amet. Dolor deserunt amet ullamco nostrud magna
            veniam adipisicing in pariatur reprehenderit exercitation cupidatat
            consequat. Ex pariatur ad in excepteur est duis mollit esse culpa in
            sunt ullamco id. Officia culpa est sit officia nostrud laborum et
            sit enim consequat incididunt occaecat.
          </p>
        }
      />
    </Wrapper>
  );
}

function planName(price: number): string {
  switch (price) {
    case 4900:
      return 'Freelancer';
    case 6900:
      return 'Startup';
    case 24900:
      return 'Enterprise';
    default:
      return 'Unknown';
  }
}

function convertToCurrency(value: number): string {
  return `$${(value / 100).toFixed(2)}`;
}
