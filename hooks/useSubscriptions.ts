import useSWR from 'swr';
import { bodyFetcher } from '.';
import { StripeSubscription } from '../types';
import { plans } from '@config/index';

type Props = {
  subscriptions?: StripeSubscription[];
  isDisabled?: boolean;
};

export function useSubscription(props: Props) {
  const isDisabled = props.isDisabled !== undefined && props.isDisabled;

  const { data, error, isLoading } = useSWR(
    !isDisabled ? `/api/v1/stripe/subscriptions` : undefined,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.subscriptions as any,
    }
  );

  return {
    data: data?.data,
    activeSubscriptions: data?.data?.activeSubs?.data as StripeSubscription[],
    canceledSubscriptions: data?.data?.canceledSubs
      ?.data as StripeSubscription[],
    subscriptions: [
      ...(data?.data?.activeSubs?.data ?? []),
      ...(data?.data?.canceledSubs?.data ?? []),
    ] as StripeSubscription[],
    subscription: data?.data?.subscription as StripeSubscription,
    customer: data?.data?.customer,
    product: data?.data?.product,
    active: data?.data?.subscription?.status === 'active',
    basic: plans?.[data?.data?.product?.name]?.basic,
    advanced: plans?.[data?.data?.product?.name]?.advanced,
    pro: plans?.[data?.data?.product?.name]?.pro,
    error,
    isLoading,
  };
}
