import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Ticket } from '../types';

type Props = {
  tickets?: Ticket[];
};

export function useSupportTickets(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/support/tickets`,
    (url: string) => bodyFetcher(url),
    {
      revalidateOnFocus: true,
      fallbackData: props?.tickets as any,
    }
  );
  const obj = data?.data?.tickets as Ticket[];

  return {
    data: obj,
    count: obj?.length ?? 0,
    error: data?.data?.error || error,
    isLoading,
  };
}
