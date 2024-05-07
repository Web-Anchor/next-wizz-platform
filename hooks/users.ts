import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Charge } from '../types';

type Props = {
  id?: string;
  charges?: Charge[];
};

export function useUser(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/user`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.charges as any,
    }
  );

  return {
    user: data?.data?.user,
    error,
    isLoading,
  };
}
