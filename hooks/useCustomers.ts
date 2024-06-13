import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Customer } from '../types';

type Props = {
  account?: string;
  customers?: Customer[];
};

export function useCustomers(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/customers`,
    (url: string) => bodyFetcher(url, { account: props.account }),
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      fallbackData: props?.customers as any,
    }
  );
  const obj = data?.data?.customers;

  return {
    data: obj,
    has_more: obj?.has_more,
    customers: obj?.data,
    error: data?.data?.error || error,
    isLoading,
  };
}
