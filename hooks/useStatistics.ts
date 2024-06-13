import useSWR from 'swr';
import { bodyFetcher } from '.';

type Props = {
  type: 'basic' | 'advanced' | 'pro';
};

export function useStatistics(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/stripe/stats/advanced-stats?type=${props?.type}`,
    (url: string) => bodyFetcher(url, {}),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    data: data,
    charges: data?.data?.charges,
    customers: data?.data?.customers,
    error,
    isLoading,
  };
}
