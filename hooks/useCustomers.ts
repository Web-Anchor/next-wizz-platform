import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Customer } from '../types';

type Props = {
  account?: string;
  customers?: Customer[];
  starting_after?: string;
  ending_before?: string;
};

export function useCustomers(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/customers`,
    (url: string) =>
      bodyFetcher(url, {
        account: props.account,
        starting_after: props.starting_after,
        ending_before: props.ending_before,
      }),
    {
      revalidateOnFocus: true,
      fallbackData: props?.customers as any,
    }
  );
  const obj = data?.data?.customers;
  console.log('🧾 Customers', obj);

  return {
    data: obj,
    has_more: obj?.has_more,
    has_previous: obj?.has_previous,
    customers: obj?.data,
    error: data?.data?.error || error,
    isLoading,
  };
}
