'use client';

import StripeKeys from '@app/components/StripeKeys';
import Wrapper from '@app/components/Wrapper';

export default function Page() {
  const keys = [
    {
      id: 1,
      name: 'Hobby',
      memory: '4 GB RAM',
      cpu: '4 CPUs',
      storage: '128 GB SSD disk',
      price: '$40',
      isCurrent: false,
    },
    {
      id: 2,
      name: 'Startup',
      memory: '8 GB RAM',
      cpu: '6 CPUs',
      storage: '256 GB SSD disk',
      price: '$80',
      isCurrent: true,
    },
  ];

  return (
    <Wrapper>
      <StripeKeys keys={keys} />
    </Wrapper>
  );
}
