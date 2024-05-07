import useSWR from 'swr';
import { bodyFetcher } from '.';
import { StripeSubscription } from '../types';

type Props = {
  subscriptions?: StripeSubscription[];
};

export function useSubscriptions(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/subscriptions`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.subscriptions as any,
    }
  );

  return {
    subscriptions: data?.data?.subscriptions?.data,
    error,
    isLoading,
  };
}
