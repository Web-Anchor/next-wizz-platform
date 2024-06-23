import useSWR from 'swr';
import { bodyFetcher } from '.';
import { StripeKey } from '../types';

type Props = {
  account?: string;
  keys?: StripeKey[];
};

export function useStripeKeys(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/keys`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,

      fallbackData: props?.keys as any,
    }
  );

  return {
    data: data?.data?.keys as StripeKey[],
    keys: data?.data?.keys as StripeKey[],
    count: data?.data?.keys?.length as number,
    hasKeys: !!data?.data?.keys?.length as boolean,
    error,
    isLoading,
  };
}
