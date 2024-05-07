'use client';

import Wrapper from '@app/components/Wrapper';
import { useSubscriptions } from '@hooks/index';

export default function Page() {
  const { subscriptions } = useSubscriptions({});
  console.log(subscriptions);

  return (
    <Wrapper>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Manage subscriptions
      </h1>
    </Wrapper>
  );
}
