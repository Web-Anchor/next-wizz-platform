'use client';

import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import { useSubscriptions, useUser } from '@hooks/index';
import Pricing from '@components/Pricing';
import PageHeadings from '@app/components/PageHeadings';
import { useStatistics } from '@hooks/statistics';
import StatsCard from '@app/components/StatsCard';
import { currentMonth, lastMonth } from '@helpers/index';
import NumbersCard from '@app/components/NumbersCard';
import Link from 'next/link';
import { Spinner } from '@app/components/Skeleton';
import Button from '@app/components/Button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { user } = useUser({});
  const { subscriptions, isLoading } = useSubscriptions({});
  const { charges, customers } = useStatistics({
    type: 'advanced',
  });
  console.log('Subs ', subscriptions);
  console.log(`user `, user);

  if (isLoading && !subscriptions) {
    return <Spinner wrapper />;
  }

  if (!subscriptions && !isLoading) {
    // --------------------------------------------------------------------------------
    // 📌  Fallback Component if no subscriptions
    // --------------------------------------------------------------------------------
    return (
      <Wrapper>
        <Pricing />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PageHeadings
        title="Dashboard. Your Central Hub for Insights and Control."
        description="Access real-time data, analytics, and key metrics on our Dashboard, empowering you with valuable insights to make informed decisions. Monitor performance, track trends, and stay in control of your operations from a centralized platform designed to streamline your workflow."
        slogan="Invoice Smarter, Grow Stronger - Empowering Your Business!"
      />

      <section>
        <SectionWrapper class="lg:flex-row flex-wrap gap-5">
          <StatsCard
            currentTotal={charges?.totalCurrentCharges}
            previousTotal={`${charges?.totalLastMonthCharges} prev`}
            percentage={charges?.chargesPercentageGrowth}
            type="payments"
            title="Payments"
            link="/dashboard/charges"
            description={currentMonth()}
          />
          <StatsCard
            currentTotal={charges?.revenueCurrentMonth}
            previousTotal={`${charges?.revenueLastMonth} prev`}
            percentage={charges?.revenueGrowthRate}
            type="payments"
            title="Revenue"
            link="/dashboard/charges"
            description={currentMonth()}
          />
          <NumbersCard
            number={customers?.customersTotal}
            icon="customers"
            title="Total Customers"
            subDescription="Total Number of Customers"
          />
          <NumbersCard
            number={charges?.avgRevenuePerUserCurrentMonth}
            icon="customers"
            title="Current Month (RPC)"
            description={currentMonth()}
            subDescription="Revenue per Customer (RPC)"
            about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
          />
          <NumbersCard
            number={charges?.avgRevenuePerUserLastMonth}
            icon="customers"
            title="Previous Month (RPC)"
            description={lastMonth()}
            subDescription="Revenue per Customer (RPC)"
            about="Revenue per Customer (RPC) is the average amount of money a customer spends on your products or services in a given period. It is calculated by dividing the total revenue generated in a month by the total number of customers in that month."
          />
          <NumbersCard
            number={charges?.totalCurrentSuccessfulCharges}
            icon="payments"
            title="Current Transactions"
            description={currentMonth()}
            subDescription="Total Successful Transactions"
          />
        </SectionWrapper>

        <Button
          title="View All Reports"
          style="link"
          onClick={() => router.push('/dashboard/reports')}
          class="mt-10"
        />
      </section>
    </Wrapper>
  );
}
