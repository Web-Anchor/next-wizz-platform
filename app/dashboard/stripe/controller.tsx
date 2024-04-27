'use client';

import StripeKeys from '@app/components/StripeKeys';
import Wrapper from '@app/components/Wrapper';
import { useStripeKeys } from '@hooks/stripe-keys';

export default function Page() {
  const { data, isLoading } = useStripeKeys({});
  console.log('StripeKeys', data);

  return (
    <Wrapper>
      <StripeKeys keys={data} fetching={isLoading} />
    </Wrapper>
  );
}
