import useSWR from 'swr';
import { bodyFetcher } from '.';

type Props = {
  key?: string;
};

export function useKeyValidate(props: Props) {
  const { data, error, isLoading } = useSWR(
    props.key ? `/api/v1/stripe/validate-key?key=${props.key}` : undefined,
    (url: string) => bodyFetcher(url, { key: props.key }),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    data,
    error: data?.data?.error || error,
    isLoading,
  };
}
