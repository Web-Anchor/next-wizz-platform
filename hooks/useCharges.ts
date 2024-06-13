import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Charge } from '../types';

type Props = {
  keyId?: string;
  charges?: Charge[];
};

export function useCharges(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/charges?account=${props.keyId}`,
    (url: string) => bodyFetcher(url, { keyId: props.keyId }),
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      fallbackData: props?.charges as any,
    }
  );
  const obj = data?.data?.charges;

  return {
    data: obj,
    charges: obj?.data,
    error,
    isLoading,
  };
}
