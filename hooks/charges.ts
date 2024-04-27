import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Charge } from '../types';

type Props = {
  account?: string;
  charges?: Charge[];
};

export function useCharges(props: Props) {
  const { data, error, isLoading } = useSWR(
    props.account
      ? `/api/v1/stripe/charges?account=${props.account}`
      : undefined,
    (url: string) => bodyFetcher(url, { account: props.account }),
    {
      revalidateOnFocus: true,
      fallbackData: props?.charges as any,
    }
  );

  return {
    data,
    charges: data?.data?.charges?.data,
    error,
    cError: data?.data?.error,
    next_page: data?.data?.charges?.next_page,
    isLoading,
  };
}
