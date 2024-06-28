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
    hasErrors: data?.data?.hasErrors,
    chargesPermissionError: data?.data?.chargesPermissionError,
    customersPermissionError: data?.data?.customersPermissionError,
    errorType: data?.data?.errorType,
    error: data?.data?.error || error,
    isLoading,
  };
}
