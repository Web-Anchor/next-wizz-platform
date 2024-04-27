import useSWR from 'swr';
import { bodyFetcher } from '.';
import { StripeKeys } from '../types';

type Props = {
  account?: string;
  keys?: StripeKeys;
};

export function useStripeKeys(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/keys`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.keys as any,
    }
  );

  return {
    data: data?.data?.keys,
    count: data?.data?.keys?.length,
    error,
    isLoading,
  };
}
