import useSWR from 'swr';
import { bodyFetcher } from '.';

type Props = {
  keyId?: string;
};

export function useTotalCharges(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/stats/total-charges?keyId=${props.keyId}`,
    (url: string) => bodyFetcher(url, { keyId: props.keyId }),
    {
      revalidateOnFocus: true,
    }
  );
  const obj = data?.data;

  return {
    data: obj,
    charges: obj?.charges,
    error,
    isLoading,
  };
}

export function useTotalCustomers(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/stats/total-customers?keyId=${props.keyId}`,
    (url: string) => bodyFetcher(url, { keyId: props.keyId }),
    {
      revalidateOnFocus: true,
    }
  );
  const obj = data?.data;

  return {
    data: obj,
    customers: obj?.customers,
    error,
    isLoading,
  };
}
