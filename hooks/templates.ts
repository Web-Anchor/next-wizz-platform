import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Template } from '../types';

type Props = {
  account?: string;
  templates?: Template[];
};

export function useTemplates(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/templates`,
    (url: string) => bodyFetcher(url, { account: props.account }),
    {
      revalidateOnFocus: true,
      fallbackData: props?.templates as any,
    }
  );
  const obj = data?.data?.templates as Template[];

  return {
    templates: obj,
    count: obj?.length ?? 0,
    error: data?.data?.error || error,
    isLoading,
  };
}
