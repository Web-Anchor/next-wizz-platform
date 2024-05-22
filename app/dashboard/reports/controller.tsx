'use client';

import PageHeadings from '@app/components/PageHeadings';
import Wrapper from '@app/components/Wrapper';
import BaseStats from '@app/components/analytics/BaseStats';
import { useUser } from '@clerk/clerk-react';
import { CardSkeleton } from '@components/Skeleton';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log('👤 User ', user);

  if (!isLoaded) {
    return <CardSkeleton />;
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Reports Hub. Gain Insights, Drive Decisions."
        description="Explore comprehensive reports and analytics on our Reports page to gain valuable insights into your financial data. Track performance metrics, monitor trends, and make informed decisions to drive your business forward. Leverage data-driven insights to optimize your strategies and achieve success."
        slogan="Informed Decisions, Thriving Business - Your Data, Your Power!"
      />

      <BaseStats />
    </Wrapper>
  );
}
