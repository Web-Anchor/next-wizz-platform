import useSWR from 'swr';
import { bodyFetcher } from '.';
import { StripeSubscription } from '../types';
import { plans } from '@config/index';

type Props = {
  subscriptions?: StripeSubscription[];
};

export function useSubscription(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/subscriptions`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.subscriptions as any,
    }
  );
  console.log('Subs ', data?.data);

  return {
    data: data?.data,
    activeSubscriptions: data?.data?.activeSubs?.data as StripeSubscription[],
    canceledSubscriptions: data?.data?.canceledSubs
      ?.data as StripeSubscription[],
    subscription: data?.data?.subscription as StripeSubscription,
    customer: data?.data?.customer,
    product: data?.data?.product,
    active: data?.data?.subscription?.active,
    basic: plans?.[data?.data?.product?.name]?.basic,
    advanced: plans?.[data?.data?.product?.name]?.advanced,
    pro: plans?.[data?.data?.product?.name]?.pro,
    error,
    isLoading,
  };
}
