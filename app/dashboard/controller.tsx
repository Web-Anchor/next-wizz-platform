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

export default function Page() {
  const { user } = useUser({});
  const { subscriptions, isLoading } = useSubscriptions({});
  const { charges, customers } = useStatistics({
    type: 'advanced',
  });
  console.log('Subs ', subscriptions);
  console.log(`user `, user);

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

        <SectionWrapper>
          <Link
            href="/dashboard/charges"
            className="w-fit my-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View All Reports
          </Link>
        </SectionWrapper>
      </section>
    </Wrapper>
  );
}
