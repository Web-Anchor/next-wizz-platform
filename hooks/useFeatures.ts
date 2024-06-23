import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Feature } from '../types';

type Props = {
  tickets?: Feature[];
};

export function useFeatures(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/support/features`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,

      fallbackData: props?.tickets as any,
    }
  );
  const obj = data?.data?.features as Feature[];
  console.log('🔑 Features: ', obj);

  return {
    data: obj,
    count: obj?.length ?? 0,
    error: data?.data?.error || error,
    isLoading,
  };
}
