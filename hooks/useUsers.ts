import useSWR from 'swr';
import { bodyFetcher } from '.';
import { User } from '../types';

type Props = {
  user?: User;
};

export function useUser(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/user`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      fallbackData: props?.user as any,
    }
  );

  return {
    user: data?.data?.user,
    error,
    isLoading,
  };
}
