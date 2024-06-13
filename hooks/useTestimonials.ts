import useSWR from 'swr';
import { bodyFetcher } from '.';
import { Testimonials } from '../types';

type Props = {
  testimonials?: Testimonials[];
};

export function useTestimonials(props: Props) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/testimonials`,
    (url: string) => bodyFetcher(url, {}),
    {
      revalidateOnFocus: true,
      fallbackData: props?.testimonials as any,
    }
  );
  const obj = data?.data;

  return {
    testimonials: obj?.testimonials as Testimonials[],
    error,
    isLoading,
  };
}
