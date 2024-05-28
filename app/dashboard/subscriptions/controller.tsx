'use client';

import Button from '@app/components/Button';
import Table from '@app/components/Table';
import Wrapper from '@app/components/Wrapper';
import { classNames, convertToYearMonthDay, isSubActive } from '@helpers/index';
import { useSubscription } from '@hooks/index';
import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { cFetch } from '@lib/cFetcher';
import { mutate } from 'swr';
import { toast } from 'sonner';
import PageHeadings from '@app/components/PageHeadings';
import { TIER_PLANS } from '@app/components/Pricing';
import { CheckIcon } from '@heroicons/react/20/solid';
import Tiers from '@app/components/Tiers';

export default function Page() {
  const [state, setState] = useState<{ fetching?: number | string }>({});
  const { activeSubscriptions } = useSubscription({});

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
      <PageHeadings
        title="Your subscriptions. Unlock Premium Features & Exclusive Content."
        description="Subscribe to access your premium features, exclusive content, and member benefits tailored to enhance your experience. Choose a subscription plan that suits your needs and enjoy a seamless journey with our platform. Elevate your experience with our subscription services today."
        slogan="Unlock Premium Perks, Elevate Your Experience!"
      />

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
        data={activeSubscriptions?.map((subscription) => {
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
          <section className="flex flex-wrap gap-5 mt-16">
            <p className="font-bold text-xl leading-6 text-gray-600 w-full mb-3">
              Your subscription plan determines the features you have access to.
            </p>
            <Tiers />
          </section>
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
