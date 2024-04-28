import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Charge } from '../types';

type Props = {
  keyId?: string;
  charges?: Charge[];
};

export function useTotalCharges(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/stats/total-charges?keyId=${props.keyId}`,
    (url: string) => bodyFetcher(url, { keyId: props.keyId }),
    {
      revalidateOnFocus: true,
      fallbackData: props?.charges as any,
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
